
$(document).ready(function() {

    const statsSection = document.getElementById("stats");

    if (statsSection) {
        let animationStarted = false;

        function animateCounters() {
            if (animationStarted) {
                return;
            }

            animationStarted = true;

            $(".stat-number").each(function() {
                const element = $(this);
                const target = Number(element.attr("data-target"));

                $({ count: 0 }).animate(
                    { count: target },
                    {
                        duration: 1500,
                        easing: "swing",
                        step: function() {
                            element.text(Math.floor(this.count) + "+");
                        },
                        complete: function() {
                            element.text(target + "+");
                        }
                    }
                );
            });
        }

        if ("IntersectionObserver" in window) {
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        animateCounters();
                        observer.disconnect();
                    }
                });
            }, {
                threshold: 0.2
            });

            observer.observe(statsSection);
        } else {
            animateCounters();
        }
    }

    $(".faq-question").on("click", function() {
        const button = $(this);
        const answer = button.next(".faq-answer");
        const isOpen = button.attr("aria-expanded") === "true";

        if (isOpen) {
            answer.stop(true, true).slideUp(250, function() {
                answer.prop("hidden", true);
            });

            button.attr("aria-expanded", "false");
            button.find(".faq-symbol").text("+");
        } else {
            answer.prop("hidden", false);
            answer.stop(true, true).hide().slideDown(250);

            button.attr("aria-expanded", "true");
            button.find(".faq-symbol").text("-");
        }
    });

    $('a[href^="#"]').on("click", function(event) {
        const targetId = $(this).attr("href");

        if (!targetId || targetId === "#") {
            return;
        }

        const target = $(targetId);

        if (target.length) {
            event.preventDefault();

            $("html, body").stop(true).animate({
                scrollTop: target.offset().top
            }, 600);
        }
    });

});
