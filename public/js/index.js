// MENU ANIMATION
document.addEventListener("DOMContentLoaded", function(event)
{
    // wait until window is loaded - meaning all images, style-sheets, and assets
    window.onload = function()
    {
        var tl = gsap.timeline();
        tl.to(".main-nav-items",
        {
            top: 0,
            duration: 0.6,
            ease: "power1"
        });
        tl.to(".main-nav-items .menu li",
        {
            opacity: 1,
            x: 20,
            stagger: 0.2,
            duration: 0.6
        }, "-=0.3");
        tl.pause()
        var menuIcon = document.querySelector(".menu-icon").addEventListener("click", () =>
        {
            tl.timeScale(1).play();
        });
        var menuCloseIcon = document.querySelector(".menu-close-icon").addEventListener("click", () =>
        {
            tl.timeScale(3).reverse();
        });
        var menuIcon1 = document.querySelector(".menu-icon").addEventListener("click", () =>
        {
            var xy = document.getElementById("mainContent");
            if (xy.style.display !== "none")
            {
                xy.style.display = "none";
                document.getElementById("mouse-icon").style.display = "none";
            }
        });
        var menuCloseIcon1 = document.querySelector(".menu-close-icon").addEventListener("click", () =>
        {
            var xy = document.getElementById("mainContent");
            if (xy.style.display === "none")
            {
                xy.style.display = "block";
                document.getElementById("mouse-icon").style.display = "block";
            }
        });
        // TAB CONTENT SERVICES
        const tabs = document.querySelectorAll('[data-tab-target]')
        const tabContents = document.querySelectorAll('[data-tab-content]')
        tabs.forEach(tab =>
        {
            tab.addEventListener('click', () =>
            {
                const target = document.querySelector(tab.dataset.tabTarget)
                tabContents.forEach(tabContent =>
                {
                    tabContent.classList.remove('active')
                })
                tabs.forEach(tab =>
                {
                    tab.classList.remove('active')
                })
                tab.classList.add('active')
                target.classList.add('active')
            })
        })
        // SWIPER SLIDER
        // Swiper TEXT
        var swiperText = new Swiper('.swiper-container-text',
        {
            pagination:
            {
                el: '.swiper-pagination',
                clickable: true,
            },
            autoplay:
            {
                delay: 5000
            },
            slidesPerView: 1,
            speed: 1500
        });
        // Logo Slider
        // Swiper Images
        var swiperImage = new Swiper('.swiper-container-image',
        {
            centeredSlides: true,
            spaceBetween: 100,
            fadeEffect:
            {
                crossFade: true
            },
            speed: 1500,
            control: swiperText,
            breakpoints:
            {
                640:
                {
                    slidesPerView: 1,
                    spaceBetween: 0,
                },
                768:
                {
                    slidesPerView: 1,
                    spaceBetween: 0,
                },
                1024:
                {
                    slidesPerView: 3,
                    spaceBetween: 100,
                }
            }
        });
        swiperText.controller.control = swiperImage;
        swiperImage.controller.control = swiperText;
        // IMAGES ON SCROLL ANIMATION
        // gsap.registerPlugin(ScrollTrigger);
        // var tlImage=gsap.timeline({
        //   scrollTrigger:{
        //     trigger:"#clients-section",
        //     // start:"center center",
        //     toggleActions:"restart none none reset",
        //   }
        // })
        // var tlImageSlide=gsap.timeline({
        //   scrollTrigger:{
        //     trigger:".swiper-container-image",
        //     // start:"center center",
        //     toggleActions:"restart none none reset",
        //   }
        // })
        // tlImage.to("#clients-section img", {
        //   clipPath:"polygon(0 0, 100% 0, 100% 100%, 0% 100%)",duration:1,
        //     });
        // tlImageSlide.to(".swiper-container-image .swiper-slide img",{
        // clipPath:"polygon(0 0, 100% 0, 100% 100%, 0% 100%)",duration:1,stagger:0.2
        // });
        // TYPER JS
        //   var typed = new Typed('#typed', {
        //     stringsElement: '#typed-strings',
        //     typeSpeed:80,
        //     fadeOut: true,
        // fadeOutClass: 'typed-fade-out-new',
        // fadeOutDelay: 500,loop: true,
        // loopCount: Infinity,
        // showCursor:false
        //   });
        // CUSTOM CURSOR
        var swiper = new Swiper('.logo-featured-mobile-1',
        {
            navigation:
            {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            slidesPerView: 1,
        });
        let cursor = document.querySelector('.cursor');
        let homeVideo = document.querySelector("#home-video .home-main-video video");
        let serviceQ = document.querySelectorAll(".question-ser");
        let navLinks = document.querySelectorAll(".main-nav-items .menu li");
        let sliderContainerImages = document.querySelectorAll(".swiper-container-image img");
        let sliderContainertexts = document.querySelectorAll(".swiper-container");
        let servicesItems = document.querySelectorAll(".services-tab ul li");
        let menuLi = document.querySelectorAll(".menu li a");
        let allContentHeading = document.querySelectorAll(".content-heading");
        let ecomtext = document.querySelector(".e-com-text");
        // let caseReadButton = document.querySelector(".case-study-read-more");
        document.addEventListener('mousemove', e =>
        {
            cursor.setAttribute("style", "top: " + (e.pageY - 10) + "px; left: " + (e.pageX - 10) + "px;");
        });
        // caseReadButton.addEventListener("mouseenter", () => {
        //            cursor.classList.add("expandHeading");
        //        });
        //  caseReadButton.addEventListener("mouseenter", () => {
        //            cursor.classList.remove("expandHeading");
        //        });
        homeVideo.addEventListener("mouseenter", () =>
        {
            cursor.classList.add("expandVideo");
        });
        homeVideo.addEventListener("mouseleave", () =>
        {
            cursor.classList.remove("expandVideo");
        });
        serviceQ.forEach((item) =>
        {
            item.addEventListener("mouseenter", () =>
            {
                cursor.classList.add("expandService");
            })
        });
        serviceQ.forEach((item) =>
        {
            item.addEventListener("mouseleave", () =>
            {
                cursor.classList.remove("expandService");
            })
        });
        allContentHeading.forEach((item) =>
        {
            item.addEventListener("mouseenter", () =>
            {
                cursor.classList.add("expandHeading");
            })
        });
        allContentHeading.forEach((item) =>
        {
            item.addEventListener("mouseleave", () =>
            {
                cursor.classList.remove("expandHeading");
            })
        });
        sliderContainerImages.forEach((item) =>
        {
            item.addEventListener("mouseenter", () =>
            {
                cursor.classList.add("expandSliderImage");
            })
        });
        sliderContainerImages.forEach((item) =>
        {
            item.addEventListener("mouseleave", () =>
            {
                cursor.classList.remove("expandSliderImage");
            })
        });
        sliderContainertexts.forEach((item) =>
        {
            item.addEventListener("mouseenter", () =>
            {
                cursor.classList.add("expandSliderText");
            })
        });
        sliderContainertexts.forEach((item) =>
        {
            item.addEventListener("mouseleave", () =>
            {
                cursor.classList.remove("expandSliderText");
            })
        });
        servicesItems.forEach((item) =>
        {
            item.addEventListener("mouseenter", () =>
            {
                cursor.classList.add("expandServiceLi");
            })
        });
        servicesItems.forEach((item) =>
        {
            item.addEventListener("mouseleave", () =>
            {
                cursor.classList.remove("expandServiceLi");
            })
        });
        menuLi.forEach((item) =>
        {
            item.addEventListener("mouseenter", () =>
            {
                cursor.classList.add("expandMenuLi");
            })
        });
        menuLi.forEach((item) =>
        {
            item.addEventListener("mouseleave", () =>
            {
                cursor.classList.remove("expandMenuLi");
            })
        });
        //  VIDEO ANIMATION
        var tlVideoOverlay = gsap.timeline(
        {
            scrollTrigger:
            {
                trigger: "#home-video",
                start: "top center",
                // toggleActions:"restart none none reset",
            }
        })
        tlVideoOverlay.to(".video-overlay",
        {
            width: 0,
            duration: 1.4
        });
        // CLient LOGO ANIMATION
        // var clientLogo = gsap.timeline({
        //     scrollTrigger: {
        //         trigger: "#clients-section",
        //         start: "top bottom",
        //         // toggleActions:"restart none none reset",
        //     }
        // })
        // clientLogo.fromTo("#clients-section .clients-section img", {
        //     opacity: 0,
        //     x: -50
        // }, {
        //     opacity: 1,
        //     x: 0,
        //     duration: 0.5,
        //     stagger: 0.1
        // });
        //SERVICES CONTENT ANIMATION
        // let serviceButtonOne = document.querySelector(".service-button-one");
        // let serviceButtonTwo = document.querySelector(".service-button-two");
        // let serviceButtonThree = document.querySelector(".service-button-three");
        // let serviceButtonFour = document.querySelector(".service-button-four");
        // serviceButtonOne.addEventListener("click",()=>{
        //   gsap.fromTo("#content-1", {opacity: 0,x:-20}, {opacity: 1,x:0, duration: 2});
        // });
        // serviceButtonTwo.addEventListener("click",()=>{
        //   gsap.fromTo("#content-2", {opacity: 0,x:-20}, {opacity: 1,x:0, duration: 2});
        // });
        // serviceButtonThree.addEventListener("click",()=>{
        //   gsap.fromTo("#content-3", {opacity: 0,x:-20}, {opacity: 1,x:0, duration: 2});
        // });
        // serviceButtonFour.addEventListener("click",()=>{
        //   gsap.fromTo("#content-4", {opacity: 0,x:-20}, {opacity: 1,x:0, duration: 2});
        // });
        // TEXT ANIMATIONS
        var typed = new Typed('#typed',
        {
            stringsElement: '#typed-strings',
            smartBackspace: true,
            loop: true,
            typeSpeed: 120,
            showCursor: false
        });
        // Counter Animation
        //  var tlCountAnimation = gsap.timeline({
        //     scrollTrigger: {
        //         trigger: "#results",
        //         start: "top center",
        //         // toggleActions:"restart none none reset",
        //     }
        // })
        // tlVideoOverlay.to(".video-overlay", {
        //     width: 0,
        //     duration: 1.4
        // });
        // TEXT ANIMATION
        var line1 = gsap.timeline(
        {
            scrollTrigger:
            {
                trigger: "#who-we-are",
                start: "center bottom",
                // toggleActions:"restart none none reset",
            }
        })
        line1.fromTo("span.line-1",
        {
            opacity: 0,
            x: -20
        },
        {
            opacity: 1,
            x: 0,
            duration: 2,
            stagger: 0.5
        });
        var lineTwo = gsap.timeline(
        {
            scrollTrigger:
            {
                trigger: ".about-us",
                start: "center bottom",
                // toggleActions:"restart none none reset",
            }
        })
        lineTwo.fromTo("span.line-2",
        {
            opacity: 0,
            x: -20
        },
        {
            opacity: 1,
            x: 0,
            duration: 2,
            stagger: 0.5
        });
        // ABOUT US PHOTO ANIMATION
        // const tlAboutPhoto = new TimelineMax();
        // const rule = CSSRulePlugin.getRule(".photo::after");
        // tlAboutPhoto.to(rule, { duration: 0, width: "100%", ease: "Power4.ease" });
        // tlAboutPhoto.to(rule, { duration: 0, right: 0, left: "unset" });
        // tlAboutPhoto.to(rule, { duration: 1, width: "0%", ease: "Power4.ease" });
        // tlAboutPhoto.to(".photo img", { duration: 0.4, opacity: 1, delay: -1,scale:1.1,stagger:0.1 });
        // ScrollTrigger.create({
        //   trigger: "#about-us-photos",
        //   animation: tlAboutPhoto,
        //   start: "center bottom",
        //   // toggleActions:"restart none none reset",
        // });
        // CUSTOM CLOCK ANIMATION
        var handHourOne = document.querySelector(".hand-hour-one");
        var nowOne = new Date();
        var hoursOne = nowOne.toLocaleString('en-US',
        {
            timeZone: 'Asia/Calcutta',
            hour: '2-digit',
            hour12: false
        });
        var minutesOne = nowOne.toLocaleString('en-US',
        {
            timeZone: 'Asia/Calcutta',
            minute: '2-digit',
            hour12: false
        });
        // document.querySelector(".text-time").innerHTML=nowOne.toLocaleDateString('en-US', { timeZone: 'Asia/Calcutta' })+'  '+nowOne.toLocaleTimeString('en-US', { timeZone: 'Asia/Calcutta' });
        document.querySelector(".text-time-location").innerHTML = "INDIA";
        gsap.fromTo(".text-time",
        {
            x: -50,
            opacity: 0
        },
        {
            x: 0,
            duration: 2,
            opacity: 1
        });
        gsap.fromTo(".text-time-location",
        {
            x: 50,
            opacity: 0
        },
        {
            x: 0,
            duration: 2,
            opacity: 1
        });
        if (hoursOne > 12)
        {
            hoursOne = hoursOne - 12;
        }
        gettime(hoursOne, minutesOne)
        var hoursDegreeOne = (((hoursOne / 12) * 360));
        gsap.to(".hand-hour-one",
        {
            rotation: hoursDegreeOne,
            duration: 0.8
        });
        document.querySelector(".first-clock").addEventListener("mouseenter", () =>
        {
            var handHourOne = document.querySelector(".hand-hour-one");
            var nowOne = new Date();
            var hoursOne = nowOne.toLocaleString('en-US',
            {
                timeZone: 'Asia/Calcutta',
                hour: '2-digit',
                hour12: false
            });
            var minutesOne = nowOne.toLocaleString('en-US',
            {
                timeZone: 'Asia/Calcutta',
                minute: '2-digit',
                hour12: false
            });
            // document.querySelector(".text-time").innerHTML=nowOne.toLocaleDateString('en-US', { timeZone: 'Asia/Calcutta' })+'  '+nowOne.toLocaleTimeString('en-US', { timeZone: 'Asia/Calcutta' });
            document.querySelector(".text-time-location").innerHTML = "INDIA";
            gsap.fromTo(".text-time",
            {
                x: -50,
                opacity: 0
            },
            {
                x: 0,
                duration: 2,
                opacity: 1
            });
            gsap.fromTo(".text-time-location",
            {
                x: 50,
                opacity: 0
            },
            {
                x: 0,
                duration: 2,
                opacity: 1
            });
            if (hoursOne > 12)
            {
                hoursOne = hoursOne - 12;
            }
            gettime(hoursOne, minutesOne)
            var hoursDegreeOne = (((hoursOne / 12) * 360));
            gsap.to(".hand-hour-one",
            {
                rotation: hoursDegreeOne,
                duration: 0.8
            });
        });
        document.querySelector(".first-clock").addEventListener("mouseleave", () =>
        {
            gsap.to(".hand-hour-one",
            {
                rotation: '0',
                duration: 0
            });
        });
        document.querySelector(".second-clock").addEventListener("mouseenter", () =>
        {
            var handHourTwo = document.querySelector(".hand-hour-two");
            var nowTwo = new Date();
            var hoursTwo = nowTwo.toLocaleString('en-US',
            {
                timeZone: 'Europe/London',
                hour: '2-digit',
                hour12: false
            });
            console.log(hoursTwo);
            var minutesTwo = nowTwo.toLocaleString('en-US',
            {
                timeZone: 'Europe/London',
                minute: '2-digit',
                hour12: false
            });
            // document.querySelector(".text-time").innerHTML = nowTwo.toLocaleDateString('en-US', {
            //     timeZone: 'Europe/London'
            // }) + '  ' + nowTwo.toLocaleTimeString('en-US', {
            //     timeZone: 'Europe/London'
            // });
            document.querySelector(".text-time-location").innerHTML = "LONDON";
            gsap.fromTo(".text-time",
            {
                x: -50,
                opacity: 0
            },
            {
                x: 0,
                duration: 2,
                opacity: 1
            });
            gsap.fromTo(".text-time-location",
            {
                x: 50,
                opacity: 0
            },
            {
                x: 0,
                duration: 2,
                opacity: 1
            });
            if (hoursTwo > 12)
            {
                hoursTwo = hoursTwo - 12;
            }
            gettime(hoursTwo, minutesTwo)
            var hoursDegreeTwo = (((hoursTwo / 12) * 360));
            gsap.to(".hand-hour-two",
            {
                rotation: hoursDegreeTwo,
                duration: 0.8
            });
        });
        document.querySelector(".second-clock").addEventListener("mouseleave", () =>
        {
            gsap.to(".hand-hour-two",
            {
                rotation: 0,
                duration: 0
            });
        });
        document.querySelector(".third-clock").addEventListener("mouseenter", () =>
        {
            var handHourThree = document.querySelector(".hand-hour-three");
            var nowThree = new Date();
            var hoursThree = nowThree.toLocaleString('en-US',
            {
                timeZone: 'Europe/Paris',
                hour: '2-digit',
                hour12: false
            });
            var minutesThree = nowThree.toLocaleString('en-US',
            {
                timeZone: 'Europe/Paris',
                minute: '2-digit',
                hour12: false
            });
            // document.querySelector(".text-time").innerHTML = nowThree.toLocaleDateString('en-US', {
            //     timeZone: 'Europe/Paris'
            // }) + '  ' + nowThree.toLocaleTimeString('en-US', {
            //     timeZone: 'Europe/Paris'
            // });
            document.querySelector(".text-time-location").innerHTML = "PARIS";
            gsap.fromTo(".text-time",
            {
                x: -50,
                opacity: 0
            },
            {
                x: 0,
                duration: 2,
                opacity: 1
            });
            gsap.fromTo(".text-time-location",
            {
                x: 50,
                opacity: 0
            },
            {
                x: 0,
                duration: 2,
                opacity: 1
            });
            if (hoursThree > 12)
            {
                hoursThree = hoursThree - 12;
            }
            gettime(hoursThree, minutesThree)
            var hoursDegreeThree = (((hoursThree / 12) * 360));
            gsap.to(".hand-hour-three",
            {
                rotation: hoursDegreeThree,
                duration: 0.8
            });
        });
        document.querySelector(".third-clock").addEventListener("mouseleave", () =>
        {
            gsap.to(".hand-hour-three",
            {
                rotation: 0,
                duration: 0
            });
        });
        document.querySelector(".fourth-clock").addEventListener("mouseenter", () =>
        {
            var handHourFour = document.querySelector(".hand-hour-four");
            var nowFour = new Date();
            var hoursFour = nowFour.toLocaleString('en-US',
            {
                timeZone: 'Australia/Brisbane',
                hour: '2-digit',
                hour12: false
            });
            var minutesFour = nowFour.toLocaleString('en-US',
            {
                timeZone: 'Australia/Brisbane',
                minute: '2-digit',
                hour12: false
            });
            // document.querySelector(".text-time").innerHTML = nowFour.toLocaleDateString('en-US', {
            //     timeZone: 'Australia/Brisbane'
            // }) + '  ' + nowFour.toLocaleTimeString('en-US', {
            //     timeZone: 'Australia/Brisbane'
            // });
            document.querySelector(".text-time-location").innerHTML = "Brisbane";
            gsap.fromTo(".text-time",
            {
                x: -50,
                opacity: 0
            },
            {
                x: 0,
                duration: 2,
                opacity: 1
            });
            gsap.fromTo(".text-time-location",
            {
                x: 50,
                opacity: 0
            },
            {
                x: 0,
                duration: 2,
                opacity: 1
            });
            if (hoursFour > 12)
            {
                hoursFour = hoursFour - 12;
            }
            gettime(hoursFour, minutesFour)
            var hoursDegreeFour = (((hoursFour / 12) * 360));
            gsap.to(".hand-hour-four",
            {
                rotation: hoursDegreeFour,
                duration: 0.8
            });
        });
        document.querySelector(".fourth-clock").addEventListener("mouseleave", () =>
        {
            gsap.to(".hand-hour-four",
            {
                rotation: 0,
                duration: 0
            });
        });

        function gettime(hrs, mts)
        {
            console.log(hrs, mts)
            var numbertotext = {
                0: "o clock",
                1: "one",
                "01": "one",
                2: "two",
                "02": "two",
                3: "three",
                "03": "three",
                4: "four",
                "04": "four",
                5: "five",
                "05": "five",
                6: "six",
                "06": "six",
                "07": "seven",
                7: "seven",
                8: "eight",
                "08": "eight",
                9: "nine",
                "09": "nine",
                10: "ten",
                11: "eleven",
                12: "twelve",
                13: "thirteen",
                14: "fourteen",
                15: "fifteen",
                16: "sixteen",
                17: "seventeen",
                18: "eighteen",
                19: "nineteen",
                20: "twenty",
                30: "thirty",
                40: "forty",
                50: "fifty",
                60: "sixty"
            }
            var finalHour = hrs;
            var finalMinute = mts;
            console.log(mts.length)
            console.log(finalHour)
            if (mts.length && mts > 20) var slicedMinute = mts.slice(1, 2);
            else var slicedMinute = mts;
            var finalString = ""
            if (finalMinute < 20)
            {
                finalString = numbertotext[slicedMinute];
            }
            else if (finalMinute < 30 && finalMinute > 20)
            {
                finalString = 'twenty ' + numbertotext[slicedMinute];
            }
            else if (finalMinute < 40 && finalMinute > 30)
            {
                finalString = 'thirty ' + numbertotext[slicedMinute];
            }
            else if (finalMinute < 50 && finalMinute > 40)
            {
                finalString = ' forty ' + numbertotext[slicedMinute];
            }
            else if (finalMinute < 60 && finalMinute > 50)
            {
                finalString = 'fifty ' + numbertotext[slicedMinute];
            }
            document.querySelector(".text-time").innerHTML = 'It\'s ' + (numbertotext[hrs]) + ' ' + finalString;
        }
    }
});
// get user ip
// $.getJSON("https://api.ipify.org/?format=json", function(e)
// {
    //   document.getElementById("ip").innerHTML = 'IP Address: ' + e.ip;
    //   document.getElementById("browser").innerHTML = 'Browser: ' +
    //     platform.name;
    //   document.getElementById("version").innerHTML = 'Version: ' +
    //     platform.version;
    //   document.getElementById("product").innerHTML = 'Product: ' +
    //     platform.product;
    //   document.getElementById("OS").innerHTML = 'OS: ' +
    //     platform.os;
    // document.getElementById("ip-text").innerHTML = "You are using " + platform.name + ' browser on ' + platform.os;
// });


function startTypingEffect() {
    var textElement = document.getElementById("ip-text");
    var baseText = "You are using ";
    textElement.innerHTML = baseText; // Reset to base text
    var dynamicText = platform.name + ' Browser on ' + platform.os;
    var i = 0;
    var cursorSpan = document.createElement('span');
    cursorSpan.textContent = '|';
    cursorSpan.className = 'ip-typing-cursor';
    textElement.appendChild(cursorSpan);

    function typeWriter() {
        if (i < dynamicText.length) {
            textElement.insertBefore(document.createTextNode(dynamicText.charAt(i)), cursorSpan);
            i++;
            setTimeout(typeWriter, 150); // Adjust typing speed by changing the timeout value
        } else {
            setTimeout(startTypingEffect, 10000); // Wait for 10 seconds before restarting
        }
    }

    typeWriter();
}

$.getJSON("https://api.ipify.org/?format=json", function(e) {
    startTypingEffect(); // Start the typing effect when the page loads
});


// GRID RESULT ANIM
var tlResult = gsap.timeline(
{
    scrollTrigger:
    {
        trigger: "#results",
        // start: "center center",
        // toggleActions: "restart none none reset",
    }
})
tlResult.fromTo("#results .text-info h2",
{
    x: -50,
    opacity: 0
},
{
    x: 0,
    opacity: 1,
    duration: 2,
});
tlResult.fromTo("#results .text-info p",
{
    x: -50,
    opacity: 0
},
{
    x: 0,
    opacity: 1,
    duration: 2,
}, '-=2');
tlResult.fromTo("#results .grids .grid img",
{
    opacity: 0,
},
{
    y: 0,
    opacity: 1,
    duration: 3,
    stagger: 0.3
}, '-=1');
// CLOCK ANIMATIOn
var tlclockAnim = gsap.timeline(
{
    scrollTrigger:
    {
        trigger: "#epic-timezone-1",
        // start: "center center",
        // toggleActions: "restart none none reset",
    }
})
tlclockAnim.fromTo(".clock-face",
{
    y: -50,
    opacity: 0
},
{
    y: 0,
    opacity: 1,
    duration: 2,
    stagger: 0.3
});
// <!-- GetButton.io widget -->
//     (function () {
//         var options = {
//             whatsapp: "8447990819", // WhatsApp number
//             email: "work@messold.com",
//             call: "8447990819",
//              // Email
//             call_to_action: "Contact us", // Call to action
//             button_color: "#000000", // Color of button
//             position: "right", // Position may be 'right' or 'left'
//             order: "whatsapp,email,call", // Order of buttons
//         };
//         var proto = document.location.protocol, host = "getbutton.io", url = proto + "//static." + host;
//         var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = url + '/widget-send-button/js/init.js';
//         s.onload = function () { WhWidgetSendButton.init(host, proto, options); };
//         var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x);
//     })();
var tlReqButton = gsap.timeline(
{
    scrollTrigger:
    {
        trigger: ".home-main-video",
        start: "top center",
        // toggleActions:"restart none none reset",
    }
})
tlReqButton.to("a.req-button",
{
    opacity: 1,
    duration: 1.4
});


$(function () {
      $(".mainFooter").load("https://messold.com/footer");
      // console.log('Footer')
})

$(function () {
      $(".mainHeader").load("https://messold.com/header");
      console.log('Header');
})

function showCard(index) {
  const cards = document.querySelectorAll('.card');
  const buttons = document.querySelectorAll('.tab-btn');
  const planNames = ['basic', 'grow', 'advanced', 'cashback'];

  cards.forEach((card, i) => {
    const isActive = i === index;
    card.classList.toggle('active', isActive);
    buttons[i].classList.toggle('active', isActive);
  });

  // Update mobile view table column
  switchPlan(planNames[index]);
}

function toggleTable() {
  const wrapper = document.getElementById('comparison-table-wrapper');
  const showBtn = document.getElementById('toggleCompareBtn');
  const closeBtn = document.getElementById('toggleCompareBtnClose');

  const isHidden = wrapper.style.display === 'none' || wrapper.style.display === '';

  // Toggle visibility using display directly
  wrapper.style.display = isHidden ? 'block' : 'none';
  closeBtn.style.display = isHidden ? 'block' : 'none';

  // Update show button content
  if (isHidden) {
    wrapper.scrollIntoView({ behavior: 'smooth' });
    showBtn.innerHTML = `<span class="plus-icon">−</span> Close compare all`;
    if (window.innerWidth <= 768) {
      showBtn.classList.add('open');
    }
  } else {
    showBtn.innerHTML = `<span class="plus-icon">+</span> Full list of features`;
    if (window.innerWidth <= 768) {
      showBtn.classList.remove('open');
    }
  }
}





function switchPlan(plan) {
  const tabs = document.querySelectorAll('.mobile-tabs button');
  tabs.forEach(btn => btn.classList.remove('active'));

  const activeTab = document.getElementById(`tab-${plan}`);
  if (activeTab) activeTab.classList.add('active');

  const table = document.querySelector('.comparison-table');
  if (table) table.setAttribute('data-active', plan);
}

// Set initial state on page load
document.addEventListener('DOMContentLoaded', () => {
  switchPlan('basic');
  showCard(0);
});



document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.getElementById("featuresCarousel");
  const cards = carousel?.querySelectorAll(".feature-card");
  const dotsContainer = document.getElementById("dotsContainer");

  if (!carousel || !cards || cards.length === 0 || !dotsContainer) return;

  dotsContainer.innerHTML = '';

  // Create dots
  cards.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
    dot.addEventListener("click", () => {
      const cardWidth = cards[0].offsetWidth + 20; // adjust gap if needed
      carousel.scrollTo({
        left: i * cardWidth,
        behavior: 'smooth'
      });

      dots.forEach(d => d.classList.remove("active"));
      dot.classList.add("active");
    });

    if (i === 0) dot.classList.add("active");
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll("button");

  // Update active dot on scroll
  carousel.addEventListener("scroll", () => {
    const cardWidth = cards[0].offsetWidth + 20;
    const index = Math.round(carousel.scrollLeft / cardWidth);
    dots.forEach(dot => dot.classList.remove("active"));
    if (dots[index]) dots[index].classList.add("active");
  });
});


document.querySelectorAll('.faq-toggle').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.parentElement;
    const icon = button.querySelector('.icon');

    item.classList.toggle('active');

    // Update icon text based on active state
    if (item.classList.contains('active')) {
      icon.textContent = '−';
    } else {
      icon.textContent = '+';
    }
  });
});