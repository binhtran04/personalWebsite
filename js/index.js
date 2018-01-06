document.addEventListener("DOMContentLoaded", function(event) {
    utils = (function() {
        function removeClass(el, className) {
            el.classList.remove(className);
        }

        function addClass(el, className) {
            el.classList.add(className);
        }

        function formatDate (date) {
        	return _getDay(date) + ' ' + _getMonth(date) + ' ' + date.getDate() + ' ' + date.getFullYear();
        }

        function _getDay (date) {
        	var day = date.getDay();

        	switch (day) {
        		case 0:
        			return 'Sunday';
        		case 1:
        			return 'Monday';
        		case 2:
        			return 'Tuesday';
        		case 3:
        			return 'Wednesday';
        		case 4:
        			return 'Thursday';
        		case 5:
        			return 'Friday';
        		case 6:
        			return 'Saturday';
        		default:
        			return false;
        	}
        }

        function _getMonth (date) {
        	var month = date.getMonth();

        	switch (month) {
        		case 0:
        			return 'January';
        		case 1:
        			return 'February';
        		case 2:
        			return 'March';
        		case 3:
        			return 'April';
        		case 4:
        			return 'May';
        		case 5:
        			return 'June';
        		case 6:
        			return 'July';
        		case 7:
        			return 'August';
        		case 8:
        			return 'September';
        		case 9:
        			return 'October';
        		case 10:
        			return 'November';
        		case 11:
        			return 'December';
        		default:
        			return false;
        	}
        }

        return {
            removeClass: removeClass,
            addClass: addClass,
            formatDate: formatDate
        };
    }());

    projectEventHandler = (function () {
    	var $firstProject = document.querySelector('#projects figure:first-of-type');
    	$firstProject.addEventListener('mouseover', function () {
    		utils.addClass($firstProject, 'border-red-dashed');
    	});

    	$firstProject.addEventListener('mouseout', function () {
    		utils.removeClass($firstProject, 'border-red-dashed');
    	});
    }());

    galery = (function () {
    	var counter = 0;
    	var $slides = document.querySelectorAll('.carousel figure');
    	var slidesNumber = $slides.length;

    	var $next = document.querySelector('.carousel .next');
    	var $prev = document.querySelector('.carousel .prev');

    	function showSlide () {
    		var slideToShow = Math.abs(counter%slidesNumber);

    		// remove class show for all slides
    		$slides.forEach(function ($slide) {
    			utils.removeClass($slide, 'show');
    		});

    		// add class show to designated slide.
    		utils.addClass($slides[slideToShow], 'show');
    	}

    	function next() {
    		counter++;
    		showSlide();
    	}

    	function prev() {
    		counter--;
    		showSlide();
    	}

    	$next.addEventListener('click', function () {
    		next();
    	})

    	$prev.addEventListener('click', function () {
    		prev();
    	})
    }());

    contactFormValidation = (function() {
        var firstName = document.contactForm.firstName;
        var lastName = document.contactForm.lastName;
        var age = document.contactForm.age;
        var email = document.contactForm.email;
        var url = document.contactForm.url;
        var comment = document.contactForm.comment;
        var inputElements = [firstName, lastName, age, email, url, comment];

        var submitBtn = document.querySelector('#contact > form > button[type="submit"]');
        var result = document.querySelector('#contact > form > span.result');

        // input event hander for form children elements
        inputElements.forEach(function(el) {
            el.addEventListener('input', function() {
                if (!this.validity.valid) {
                    utils.removeClass(this.nextElementSibling, 'hide');
                } else {
                    utils.addClass(this.nextElementSibling, 'hide');
                }
            })
        })

        // click hander for submit button
        submitBtn.addEventListener('click', function (e) {
        	e.preventDefault();
        	var formValid = true;

        	// go through each form children element to check for validity
        	inputElements.forEach(function (el) {
        		if (!el.validity.valid) {
                    utils.removeClass(el.nextElementSibling, 'hide');
                    formValid = false;
                } else {
                    utils.addClass(el.nextElementSibling, 'hide');
                }
        	});

        	// show the final result if the form is valid
        	if (!formValid) {
        		utils.addClass(result, 'hide')
        	} else {
        		utils.removeClass(result, 'hide')
        	}
        });
    }());

    romanNumberConverter = (function() {
        function convertToRoman(num) {
            var romans = [
                ['I', 'V'],
                ['X', 'L'],
                ['C', 'D'],
                ['M']
            ];

            // split the number into array and reverse it
            // e.g. 2017 => [7, 1, 0, 2]
            var numSplit = parseInt(num, 10).toString().split('').reverse().map(num => parseInt(num, 10));
            var toRoman = '';

            for (var i = 0; i < numSplit.length; i++) {
                // init the current digit to Roman in regards to the romans array
                // e.g. 9 => 'IIIIIIIII'
                // e.e. 90 => 'XXXXXXXXX'
                toRoman = romans[i][0].repeat(numSplit[i]) + toRoman;


                if (romans[i][1]) {
                    // change 5. e.g. 'IIIII' => 'V'
                    toRoman = toRoman.replace(romans[i][0].repeat(5), romans[i][1])
                        // change 9. e.g. 'VIIII' => 'IX'
                        .replace(romans[i][1] + romans[i][0].repeat(4), romans[i][0] + romans[i + 1][0])
                        // change 4. e.g. 'IIII' => 'IV'
                        .replace(romans[i][0].repeat(4), romans[i][0] + romans[i][1]);
                }
            }
            return toRoman;
        }

        var number = document.getElementById('inputNumericNumber');
        var convertBtn = document.getElementById('romanConvertBtn');

        convertBtn.addEventListener('click', function (e) {
        	if (number.validity.valid) {
        		var value = number.value;
	        	var roman = convertToRoman(value);
	        	this.nextElementSibling.innerHTML = roman;
	        	utils.addClass(number.nextElementSibling, 'hide');
        	} else {
        		utils.removeClass(number.nextElementSibling, 'hide');
        	}
        	
        })
    }());

    currentDate = (function () {
    	var date = new Date();
    	var $date = document.querySelector('footer .current-date');
    	$date.textContent =  utils.formatDate(date);
    }());
});