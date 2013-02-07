(function ($) {

    function animationChainImpl(animationElement) {
        var steps = [];
        var stepIndex = 0;
        var fireNextStep = false;
        var running = false;

        // Execute the next item in the chain
        var nextStep = function () {
            setTimeout(function () {
                if (steps.length == 0)
                    return;

                if (stepIndex >= steps.length)
                    return;

                steps[stepIndex]();
                stepIndex++;

                if (fireNextStep) {
                    fireNextStep = false;
                    nextStep();
                }
            }, 0);
        };


        // Executes the function passed in and passes the parameter object to it on execution.
        this.execute = function (func, parmObject) {
            steps.push(function () {
                func(parmObject);
                fireNextStep = true;
            });

            return this;
        };

        // Delays the chain execution by the spcified time in milliseconds.
        this.delay = function (delay) {
            steps.push(function () {
                setTimeout(function () {
                    nextStep();
                }, delay);
            });

            return this;
        };

        // Adds a class to the element and waits for the transition to complete. Set wait = false to not wait.
        this.addClass = function (className, wait) {
            steps.push(function () {

                if (wait == false) {
                    fireNextStep = true;
                } else {
                    bindTransitionEnd();
                }

                animationElement.addClass(className);
            });

            return this;
        };

        // Removes a class from the element and waits for the transition to complete. Set wait = false to not wait.
        this.removeClass = function (className, wait) {
            steps.push(function () {

                if (wait == false) {
                    fireNextStep = true;
                } else {
                    bindTransitionEnd();
                }

                animationElement.removeClass(className);
            });

            return this;
        };

        // Starts the animation chain.
        this.start = function () {
            if (!running) {
                running = true;
                nextStep();
            }
        };


        var bindTransitionEnd = function () {
            animationElement.on(transitionedEventName, function () {
                animationElement.off(transitionedEventName);
                nextStep();
            });
        };

        var getTransitionedEventName = function () {
            var eventName = 'ontransitionend';
            var el = $("<div />").get(0);
            var isSupported = (eventName in el);
            if (!isSupported) {
                el.setAttribute(eventName, 'return;');
                isSupported = typeof el[eventName] == 'function';
            }
            el.remove();
            return isSupported ? "transitionend" : "webkitTransitionEnd";
        };

        var transitionedEventName = getTransitionedEventName();

    }

    $.fn.animationChain = function () {
        return new animationChainImpl(this);
    };

    $.animationChain = $.fn.animationChain;

})(jQuery);

