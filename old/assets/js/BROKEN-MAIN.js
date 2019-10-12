// TODO: Switch out scroll library and replace with native browser scrollIntoView API

// Log Rocket Store User Information
var userInformation = {};

// Declare the current camp variable
var currentCamp = "none";
var currentCampValue = "";

var mainForm = document.getElementById('main-form');

// Create initial alert
var alert = document.getElementById('alert');
var span1 = document.createElement("span");
span1.innerHTML = "Need help? ";
var alertLink = document.createElement("a");
alertLink.target = "_blank";
alertLink.href = "./guide.html";
alertLink.classList.add("alert-link");
alertLink.innerHTML = "Read our guide";
var span2 = document.createElement("span");
span2.innerHTML = " for more information.";
alert.appendChild(span1);
alert.appendChild(alertLink);
alert.appendChild(span2);

// Data to send through FormBody
var workingTLs = [];
var workingLCs = [];
var workingWPs = [];
var workingOCs = [];
var sickTLs = [];
var sickLCWPs = [];
var sickOCs = [];
var exceptionTLs = [];
var exceptionLCs = [];
var exceptionWPs = [];
var exceptionOCs = [];

var exceptionTLsInfo = [];
var exceptionLCWPsInfo = [];
var exceptionOCsInfo = [];

var lcCheckboxes = [];
var wpCheckboxes = [];

var chosenSite = "";

var tlIsSick = false;
var lcwpIsSick = false;
var ocIsSick = false;

var sickTLsInfo = [];
var sickLCWPsInfo = [];
var sickOCsInfo = [];

var checkedSickTLCheckboxes = [];
var checkedSickLCWPCheckboxes = [];
var checkedSickOCCheckboxes = [];


// Form Cards
var siteInfoCard = document.getElementById('site-info-card');
var tlCard = document.getElementById('tl-card');
var lcwpCard = document.getElementById('lcwp-card');
var ocCard = document.getElementById('oc-card');
var allPositionCards = [tlCard, lcwpCard, ocCard];

// Card Buttons
var siteInfoContinueButton = document.getElementById('site-info-continue-button');
siteInfoContinueButton.addEventListener('click', showPositionCards);
var continueButtonContainer = document.getElementById('continue-button-container');
var sendDataButton = document.getElementById('send-data-button');

// Invalid Feedback
var invalidFeedbackFirstName = document.getElementById('invalid-feedback-first-name');
var invalidFeedbackLastName = document.getElementById('invalid-feedback-last-name');
var invalidFeedbackSite = document.getElementById('invalid-feedback-site');
var invalidFeedbackCamp = document.getElementById('invalid-feedback-camp');

// Name Inputs
var firstName = document.getElementById('firstName');
var lastName = document.getElementById('lastName');
firstName.addEventListener("input", checkName);
lastName.addEventListener("input", checkName);

// Site Inputs
var siteSW = document.getElementById('site-sw');
var siteSTAN = document.getElementById('site-stan');
var siteUCF = document.getElementById('site-ucf');
var siteVILLA = document.getElementById('site-villa');
var allSiteInputs = [siteSW, siteSTAN, siteUCF, siteVILLA];

// Camp Groups
var noSiteText = document.getElementById('no-site-text');
var swCamps = document.getElementById('sw-camps');
var stanCamps = document.getElementById('stan-camps');
var ucfCamps = document.getElementById('ucf-camps');
var villaCamps = document.getElementById('villa-camps');

// Southwestern University Camps
var swCamp1 = document.getElementById('sw-camp1');
var swCamp2 = document.getElementById('sw-camp2');
var allSWCampInputs = [swCamp1, swCamp2];

// Stanford University Camps
var stanCamp1 = document.getElementById('stan-camp1');
var stanCamp2 = document.getElementById('stan-camp2');
var stanCamp3 = document.getElementById('stan-camp3');
var stanCamp4 = document.getElementById('stan-camp4');
var stanCamp5 = document.getElementById('stan-camp5');
var stanCamp6 = document.getElementById('stan-camp6');
var allSTANCampInputs = [stanCamp1, stanCamp2, stanCamp3, stanCamp4, stanCamp5, stanCamp6];

// University of Central Florida Camps
var ucfCamp1 = document.getElementById('ucf-camp1');
var ucfCamp2 = document.getElementById('ucf-camp2');
var allUCFCampInputs = [ucfCamp1, ucfCamp2];

// Villanova Camps
var villaCamp1 = document.getElementById('villa-camp1');
var villaCamp2 = document.getElementById('villa-camp2');
var allVILLACampInputs = [villaCamp1, villaCamp2];

// All Camps
var allCamps = [swCamp1, swCamp2, stanCamp1, stanCamp2, stanCamp3, stanCamp4, stanCamp5, stanCamp6, ucfCamp1, ucfCamp2, villaCamp1, villaCamp2];

// Listen for the user to select a site
siteSW.addEventListener("click", siteChosen);
siteSTAN.addEventListener("click", siteChosen);
siteUCF.addEventListener("click", siteChosen);
siteVILLA.addEventListener("click", siteChosen);

// Listen for the user to select a camp
allCamps.forEach(function (camp) {
    camp.addEventListener("click", campChosen);
});

// Dates
var dateMonth = document.getElementById('date-month');
var dateDay = document.getElementById('date-day');

// Listen for the date changing (either by default or by user)
dateMonth.addEventListener("change", dateChanged);
dateDay.addEventListener("change", dateChanged);

// Team Leader Hours Worked
var hoursWorkedTL = document.getElementById('hours-worked-tl');
var hoursWorkedLCWP = document.getElementById('hours-worked-lc-wp');
var hoursWorkedOC = document.getElementById('hours-worked-oc');

// Div that holds the staff member checkboxes
var staffMembersTLContainer = document.getElementById('staff-members-tl-container');
var staffMembersLCWPContainer = document.getElementById('staff-members-lc-wp-container');
var staffMembersOCContainer = document.getElementById('staff-members-oc-container');
var allStaffMembersContainers = [staffMembersTLContainer, staffMembersLCWPContainer, staffMembersOCContainer];

// Variable for the current staff member input checkboxes
var tlCheckboxes = [];
var lcwpCheckboxes = [];
var ocCheckboxes = [];
var allTypesCheckboxes = [tlCheckboxes, lcwpCheckboxes, ocCheckboxes];

// Div that holds the "exceptions" to the default hours worked that day
var exceptionsTLContainer = document.getElementById('exceptions-container-tl');
var exceptionsLCWPContainer = document.getElementById('exceptions-container-lc-wp');
var exceptionsOCContainer = document.getElementById('exceptions-container-oc');
var allExceptionsContainers = [exceptionsTLContainer, exceptionsLCWPContainer, exceptionsOCContainer];

// Title for the TL "exceptions" container
var exceptionsTitleTL = document.getElementById('exceptions-title-tl');
var exceptionsTitleLCWP = document.getElementById('exceptions-title-lc-wp');
var exceptionsTitleOC = document.getElementById('exceptions-title-oc');
var allExceptionsTitles = [exceptionsTitleTL, exceptionsTitleLCWP, exceptionsTitleOC];

// Sick Switches
var tlSickSwitchInput = document.getElementById('tl-sick-switch-input');
var tlSickSwitchSpan = document.getElementById('tl-sick-switch-span');
var lcwpSickSwitchInput = document.getElementById('lc-wp-sick-switch-input');
var lcwpSickSwitchSpan = document.getElementById('lc-wp-sick-switch-span');
var ocSickSwitchInput = document.getElementById('oc-sick-switch-input');
var ocSickSwitchSpan = document.getElementById('oc-sick-switch-span');
var allSickSwitchInputs = [tlSickSwitchInput, lcwpSickSwitchInput, ocSickSwitchInput];
var allSickSwitchSpans = [tlSickSwitchSpan, lcwpSickSwitchSpan, ocSickSwitchSpan];

// Listen if the user changes the switch
allSickSwitchInputs.forEach(function (groupInput) {
    groupInput.addEventListener("change", sickSwitched);
});

// Sick Staff Containers
var sickStaffTLContainer = document.getElementById('sick-staff-tl-container');
var sickStaffLCWPContainer = document.getElementById('sick-staff-lc-wp-container');
var sickStaffOCContainer = document.getElementById('sick-staff-oc-container');

// Sick Staff Titles
var sickStaffTLTitle = document.getElementById('sick-staff-tl-title');
var sickStaffLCWPTitle = document.getElementById('sick-staff-lc-wp-title');
var sickStaffOCTitle = document.getElementById('sick-staff-oc-title');
var allSickTitles = [sickStaffTLTitle, sickStaffLCWPTitle, sickStaffOCTitle];

// Variable for the current sick staff member input checkboxes
var sickTLCheckboxes = [];
var sickLCWPCheckboxes = [];
var sickOCCheckboxes = [];
var allSickGroupCheckboxes = [sickTLCheckboxes, sickLCWPCheckboxes, sickOCCheckboxes];

// Div that holds the "exceptions" to the default hours worked that day - sick
var sickExceptionsTLContainer = document.getElementById('sick-exceptions-container-tl');
var sickExceptionsLCWPContainer = document.getElementById('sick-exceptions-container-lc-wp');
var sickExceptionsOCContainer = document.getElementById('sick-exceptions-container-oc');
var allSickExceptionsContainers = [sickExceptionsTLContainer, sickExceptionsLCWPContainer, sickExceptionsOCContainer];

// Title for the sick "exceptions" containers
var sickExceptionsTitleTL = document.getElementById('sick-exceptions-title-tl');
var sickExceptionsTitleLCWP = document.getElementById('sick-exceptions-title-lc-wp');
var sickExceptionsTitleOC = document.getElementById('sick-exceptions-title-oc');

// Warnings for sick exceptions
var exceptionsWarningTL = document.getElementById('exceptions-warning-tl');
var exceptionsWarningLCWP = document.getElementById('exceptions-warning-lcwp');
var exceptionsWarningOC = document.getElementById('exceptions-warning-oc');

// Make sure that switches and checkboxes and radios are blank when the page first loads
document.addEventListener("DOMContentLoaded", setBlank);

function siteChosen() {
    var value = this.value;

    hideThis(invalidFeedbackSite);

    if (value === "sw") {
        hideThis([stanCamps, ucfCamps, villaCamps, noSiteText]);
        showThis(swCamps);
        chosenSite = "sw";
    } else if (value === "stan") {
        hideThis([swCamps, ucfCamps, villaCamps, noSiteText]);
        showThis(stanCamps);
        chosenSite = "stan";
    } else if (value === "ucf") {
        hideThis([swCamps, stanCamps, villaCamps, noSiteText]);
        showThis(ucfCamps);
        chosenSite = "ucf";
    } else {
        hideThis([swCamps, stanCamps, ucfCamps, noSiteText]);
        showThis(villaCamps);
        chosenSite = "villa";
    }


    resetInfo();
    checkEmptyPositions();
}

function campChosen() {
    var value = this.value;

    hideThis(invalidFeedbackCamp);


    // Reset the date so that anything is enabled
    monthsToEnable = [0, 1, 2, 3];
    daysToEnable = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

    enableDates(monthsToEnable, daysToEnable);

    // Set date depending on selected camp. Also state which camp is selected. Disable date options depending on selection.
    if (value === "sw-camp1") {
        dateMonth.value = "6";
        dateDay.value = "19";
        currentCamp = "sw-camp1";
        monthsToDisable = [0, 2, 3];
        daysToDisable = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 31];
        disableDates(monthsToDisable, daysToDisable);
    } else if (value === "sw-camp2") {
        dateMonth.value = "7";
        dateDay.value = "3";
        currentCamp = "sw-camp2";
        monthsToDisable = [0, 1, 3];
        daysToDisable = [0, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
        disableDates(monthsToDisable, daysToDisable);
    } else if (value === "stan-camp1") {
        dateMonth.value = "6";
        dateDay.value = "22";
        currentCamp = "stan-camp1";
        monthsToDisable = [0, 3];
        daysToDisable = [0, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 31];
        disableDates(monthsToDisable, daysToDisable);
    } else if (value === "stan-camp2") {
        dateMonth.value = "7";
        dateDay.value = "9";
        currentCamp = "stan-camp2";
        monthsToDisable = [0, 1, 3];
        daysToDisable = [0, 1, 2, 3, 4, 5, 6, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
        disableDates(monthsToDisable, daysToDisable);
    } else if (value === "stan-camp3") {
        dateMonth.value = "7";
        dateDay.value = "17";
        currentCamp = "stan-camp3";
        monthsToDisable = [0, 1, 3];
        daysToDisable = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 23, 24, 25, 26, 27, 28, 29, 30, 31];
        disableDates(monthsToDisable, daysToDisable);
    } else if (value === "stan-camp4") {
        dateMonth.value = "7";
        dateDay.value = "25";
        currentCamp = "stan-camp4";
        monthsToDisable = [0, 1, 3];
        daysToDisable = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 31];
        disableDates(monthsToDisable, daysToDisable);
    } else if (value === "stan-camp5") {
        dateMonth.value = "8";
        dateDay.value = "2";
        currentCamp = "stan-camp5";
        monthsToDisable = [0, 1];
        daysToDisable = [0, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
        disableDates(monthsToDisable, daysToDisable);
    } else if (value === "stan-camp6") {
        dateMonth.value = "8";
        dateDay.value = "14";
        currentCamp = "stan-camp6";
        monthsToDisable = [0, 1, 2];
        daysToDisable = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
        disableDates(monthsToDisable, daysToDisable);
    } else if (value === "ucf-camp1") {
        dateMonth.value = "7";
        dateDay.value = "3";
        currentCamp = "ucf-camp1";
        monthsToDisable = [0, 1, 3];
        daysToDisable = [0, 1, 2, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
        disableDates(monthsToDisable, daysToDisable);
    } else if (value === "ucf-camp2") {
        dateMonth.value = "7";
        dateDay.value = "17";
        currentCamp = "ucf-camp2";
        monthsToDisable = [0, 1, 3];
        daysToDisable = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 24, 25, 26, 27, 28, 29, 30, 31];
        disableDates(monthsToDisable, daysToDisable);
    } else if (value === "villa-camp1") {
        dateMonth.value = "7";
        dateDay.value = "3";
        currentCamp = "villa-camp1";
        monthsToDisable = [0, 1, 3];
        daysToDisable = [0, 1, 2, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
        disableDates(monthsToDisable, daysToDisable);
    } else {
        dateMonth.value = "7";
        dateDay.value = "17";
        currentCamp = "villa-camp2";
        monthsToDisable = [0, 1, 3];
        daysToDisable = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 24, 25, 26, 27, 28, 29, 30, 31];
        disableDates(monthsToDisable, daysToDisable);
    }

    currentCampValue = this.parentNode.lastElementChild.textContent;

    resetInfo();
    dateChanged();
    addStaffMembers();
}

function dateChanged() {
    if (currentCamp === "sw-camp1") {
        if (dateDay.value === "19") {
            // Day -6
            setHoursWorked(0, 8, 9);
        } else if (dateDay.value === "20") {
            // Day -5
            setHoursWorked(0, 10, 9);
        } else if (dateDay.value === "21") {
            // Day -4
            setHoursWorked(10, 11, 9);
        } else if (dateDay.value === "22" || dateDay.value === "23" || dateDay.value === "24") {
            // Day -3, -2, -1
            setHoursWorked(11, 11, 9);
        } else if (dateDay.value === "28") {
            // Day 4
            setHoursWorked(15, 11, 0);
        } else {
            // Day 1, 2, 3, 5, 6
            setHoursWorked(15, 11, 9);
        }
    } else if (currentCamp === "sw-camp2") {
        if (dateDay.value === "1" || dateDay.value === "9") {
            // Day -2 and Departure Day
            setHoursWorked(0, 0, 0);
        } else if (dateDay.value === "2") {
            // Day -1
            setHoursWorked(0, 0, 4);
        } else if (dateDay.value === "6") {
            // Day 4
            setHoursWorked(15, 11, 0);
        } else {
            // Day 1, 2, 3, 5, 6
            setHoursWorked(15, 11, 9);
        }
    } else if (currentCamp === "stan-camp1") {
        if (dateMonth.value === "6") {
            if (dateDay.value === "22") {
                // Day -5
                setHoursWorked(0, 0, 0);
            } else if (dateDay.value === "23") {
                // Day -4
                setHoursWorked(10, 10, 9);
            } else if (dateDay.value === "24" || dateDay.value === "25" || dateDay.value === "26" || dateDay.value === "27" || dateDay.value === "28" || dateDay.value === "30") {
                // Day -3, -2, -1, 1, 2, 4
                setHoursWorked(11, 11, 9);
            } else if (dateDay.value === "29") {
                // Day 3
                setHoursWorked(11, 11, 0);
            }
        } else if (dateMonth.value === "7") {
            if (dateDay.value === "1" || dateDay.value === "2" || dateDay.value === "3" || dateDay.value === "4" || dateDay.value === "5") {
                // Day 5, 6, 7, 8, 9
                setHoursWorked(11, 11, 9);
            } else if (dateDay.value === "6") {
                // Day 10
                setHoursWorked(10, 10, 9);
            }
        }
    } else if (currentCamp === "stan-camp2") {
        if (dateDay.value === "7") {
            // Day -2
            setHoursWorked(0, 0, 5);
        } else if (dateDay.value === "8") {
            // Day -1
            setHoursWorked(0, 0, 0);
        } else if (dateDay.value === "9" || dateDay.value === "10" || dateDay.value === "11" || dateDay.value === "13" || dateDay.value === "14") {
            // Day 1, 2, 3, 5, 6
            setHoursWorked(11, 11, 9);
        } else if (dateDay.value === "12") {
            // Day 4
            setHoursWorked(11, 11, 0);
        }
    } else if (currentCamp === "stan-camp3") {
        if (dateDay.value === "15") {
            // Day -2
            setHoursWorked(0, 0, 5);
        } else if (dateDay.value === "16") {
            // Day -1
            setHoursWorked(0, 0, 0);
        } else if (dateDay.value === "17" || dateDay.value === "18" || dateDay.value === "19" || dateDay.value === "20" || dateDate.value === "21" || dateDay.value === "22") {
            // Day 1, 2, 3, 4, 5, 6
            setHoursWorked(11, 11, 9);
        }
    } else if (currentCamp === "stan-camp4") {
        if (dateDay.value === "23") {
            // Day -2
            setHoursWorked(0, 0, 9);
        } else if (dateDay.value === "24") {
            // Day -1
            setHoursWorked(4, 4, 9);
        } else if (dateDay.value === "25" || dateDay.value === "26" || dateDay.value === "27" || dateDay.value === "29" || dateDay.value === "30") {
            // Day 1, 2, 3, 5, 6
            setHoursWorked(11, 11, 9);
        } else if (dateDay.value === "28") {
            // Day 4
            setHoursWorked(11, 11, 0);
        }
    } else if (currentCamp === "stan-camp5") {
        if (dateMonth.value === "7") {
            if (dateDay.value === "31") {
                // Day -2
                setHoursWorked(0, 0, 5);
            }
        } else if (dateMonth.value === "8") {
            if (dateDay.value === "1") {
                // Day -1
                setHoursWorked(0, 0, 0);
            } else if (dateDay.value === "2" || dateDay.value === "5" || dateDay.value === "6" || dateDay.value === "7" || dateDay.value === "8" || dateDay.value === "9" || dateDay.value === "10") {
                // Day 1, 4, 5, 6, 7, 8, 9
                setHoursWorked(11, 11, 9);
            } else if (dateDay.value === "3") {
                // Day 2
                setHoursWorked(11, 11, 0);
            } else if (dateDay.value === "4") {
                // Day 3
                setHoursWorked(11, 11, 5);
            } else if (dateDay.value === "11") {
                // Day 10
                setHoursWorked(10, 10, 9);
            }
        }
    } else if (currentCamp === "stan-camp6") {
        if (dateDay.value === "12") {
            // Day -2
            setHoursWorked(0, 0, 5);
        } else if (dateDay.value === "13") {
            // Day -1
            setHoursWorked(0, 0, 0);
        } else if (dateDay.value === "14" || dateDay.value === "15" || dateDay.value === "16" || dateDay.value === "17" || dateDay.value === "18" || dateDay.value === "19") {
            // Day 1, 2, 3, 4 ,5, 6
            setHoursWorked(11, 11, 9);
        }
    } else if (currentCamp === "ucf-camp1" || currentCamp === "villa-camp1") {
        if (dateDay.value === "3") {
            // Day -6
            setHoursWorked(0, 8, 9);
        } else if (dateDay.value === "4") {
            // Day -5
            setHoursWorked(0, 10, 9);
        } else if (dateDay.value === "5") {
            // Day -4
            setHoursWorked(10, 11, 9);
        } else if (dateDay.value === "6" || dateDay.value === "7" || dateDay.value === "8" || dateDay.value === "9" || dateDay.value === "10" || dateDay.value === "11" || dateDay.value === "13" || dateDay.value === "14") {
            // Day -3, -2, -1, 1, 2, 3, 5, 6
            setHoursWorked(11, 11, 9);
        } else if (dateDay.value === "12") {
            // Day 4
            setHoursWorked(11, 11, 0);
        }
    } else if (currentCamp === "ucf-camp2" || currentCamp === "villa-camp2") {
        if (dateDay.value === "15") {
            // Day -2
            setHoursWorked(0, 0, 0);
        } else if (dateDay.value === "16") {
            // Day -1
            setHoursWorked(0, 0, 4);
        } else if (dateDay.value === "17" || dateDay.value === "18" || dateDay.value === "19" || dateDay.value === "21" || dateDay.value === "22") {
            // Day 1, 2, 3, 5, 6
            setHoursWorked(11, 11, 9);
        } else if (dateDay.value === "20") {
            // Day 4
            setHoursWorked(11, 11, 0);
        }
    }
}

function disableDates(months, days) {
    months.forEach(function (option) {
        dateMonth.options[option].disabled = true;
    });

    days.forEach(function (option) {
        dateDay.options[option].disabled = true;
    });
}

function enableDates(months, days) {
    months.forEach(function (option) {
        dateMonth.options[option].disabled = false;
    });

    days.forEach(function (option) {
        dateDay.options[option].disabled = false;
    });
}

function addStaffMembers() {
    // Clear staff list containers
    allStaffMembersContainers.forEach(function (container) {
        container.innerHTML = "";
    });

    // Who is working this particular camp
    let staffMembersWorking = [];

    // Go through list of all staff members, and add them to the list if they are working this camp
    staffMembersAll.forEach(function (person) {
        if (person.campsWorking.includes(currentCamp)) {
            staffMembersWorking.push(person);
        }
    });

    // Go through staff members working, and make a new array if the person is going to be a [TL, LC, WP, OC]
    let staffMembersWorkingTL = staffMembersWorking.filter(isTL);
    let staffMembersWorkingLC = staffMembersWorking.filter(isLC);
    let staffMembersWorkingWP = staffMembersWorking.filter(isWP);
    let staffMembersWorkingOC = staffMembersWorking.filter(isOC);

    let staffMemberGroups = [staffMembersWorkingTL, staffMembersWorkingLC, staffMembersWorkingWP, staffMembersWorkingOC];

    // Sort each group of staff members alphabetically by last name
    staffMemberGroups.forEach(function (group) {
        group.sort(compareValues('lastName'));
    });

    // For each staff member group, add a label, checkbox, and span for each person in the appropriate location
    staffMemberGroups.forEach(function (group) {
        group.forEach(function (person) {
            let label = document.createElement('label');
            label.classList.add("custom-control", "custom-checkbox");

            let checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.classList.add("custom-control-input");
            checkbox.name = `${person.firstName}` + " " + `${person.lastName}`;
            checkbox.value = `${person.firstName}` + `${person.lastName}`;
            checkbox.id = `${person.firstName}`.toLowerCase() + "-" + `${person.lastName}`.toLowerCase();
            checkbox.checked = true;
            checkbox.addEventListener("change", checkExceptions);

            let span = document.createElement("span");
            span.classList.add("custom-control-label");
            span.innerHTML = assignSpanLabel();

            function assignSpanLabel() {
                // If this person has a weird role thing
                if (person.specialStaffMember !== undefined) {
                    // If the current camp is the current person's weird camp
                    var specificSpecialPerson = person.specialStaffMember.filter(function (staff) {
                        return staff.id === person.firstName.concat(" ", person.lastName);
                    });
                    if (specificSpecialPerson[0].id === "Yolanda Drew") {
                        if (currentCamp === "sw-camp1") {
                            return "<em>(" + person.specialStaffMember[0].camps["sw-camp1"] + ")</em> " + person.firstName + " " + person.lastName;
                        } else if (currentCamp === "villa-camp1") {
                            return "<em>(" + person.specialStaffMember[0].camps["villa-camp1"] + ")</em> " + person.firstName + " " + person.lastName;
                        }
                    } else {
                        return undefined;
                    }
                } else return "<em>(" + ("" + person.position1) + ")</em> " + ("" + person.firstName) + " " + ("" + person.lastName);
            }

            if (group === staffMembersWorkingTL) {
                checkbox.dataset.position = "TL";
                staffMembersTLContainer.appendChild(label);
                label.appendChild(checkbox);
                label.appendChild(span);
                tlCheckboxes.push(checkbox);
            } else if (group === staffMembersWorkingLC || group === staffMembersWorkingWP) {
                checkbox.dataset.position = "LCWP";
                staffMembersLCWPContainer.appendChild(label);
                label.appendChild(checkbox);
                label.appendChild(span);
                lcwpCheckboxes.push(checkbox);

                if (group === staffMembersWorkingLC) {
                    lcCheckboxes.push(checkbox);
                } else if (group === staffMembersWorkingWP) {
                    wpCheckboxes.push(checkbox);
                }
            } else {
                checkbox.dataset.position = "OC";
                staffMembersOCContainer.appendChild(label);
                label.appendChild(checkbox);
                label.appendChild(span);
                ocCheckboxes.push(checkbox);
            }
        });
    });
}

function checkExceptions() {
    // ! This is where you are running into trouble with Issue #3
    // ? Try NOT clearing the list of exceptions?
    /*
    // Clear list of exceptions
    allExceptionsContainers.forEach(function (container) {
        container.innerHTML = "";
    });
    */

    var uncheckedTLCheckboxes = [];
    var uncheckedLCWPCheckboxes = [];
    var uncheckedOCCheckboxes = [];

    let allCheckboxes = [tlCheckboxes, lcwpCheckboxes, ocCheckboxes];

    let inputsToKeep = [];
    let allNewInputs = [];
    let inputsToAppend = [];

    allCheckboxes.forEach(function (checkboxGroup) {
        let name = "";
        if (checkboxGroup === tlCheckboxes) {
            name = "tlCheckboxes";
        } else if (checkboxGroup === lcwpCheckboxes) {
            name = "lcwpCheckboxes";
        } else if (checkboxGroup === ocCheckboxes) {
            name = "ocCheckboxes";
        }
        // ! Current error of dataset is undefined
        // ! Suspect it is happening because ocCheckboxes is an array of length = 0 for Villanova (and SW, UCF)
        // * Adding check to see if the length is greater than 0
        if (checkboxGroup.length > 0) {
            if (checkboxGroup.some(isUnchecked)) {
                // Clear the array of unchecked checkboxes
                // FIX?
                let checkboxes = checkboxGroup;

                if (checkboxGroup[0].dataset.position === "TL") {
                    // Show the Title and the Container itself
                    showThis(exceptionsTitleTL, exceptionsWarningTL, exceptionsTLContainer);
                } else if (checkboxGroup[0].dataset.position === "LCWP") {
                    // Show the Title and the Container itself
                    showThis(exceptionsTitleLCWP, exceptionsWarningLCWP, exceptionsLCWPContainer);
                } else {
                    // Show the Title and the Container itself
                    showThis(exceptionsTitleOC, exceptionsWarningOC, exceptionsOCContainer);
                }

                // Go through checkboxes, if one is unchecked, add it to the array
                checkboxes.forEach(function (checkbox) {
                    if (checkbox.checked === false) {
                        if (checkboxGroup[0].dataset.position === "TL") {
                            uncheckedTLCheckboxes.push(checkbox);
                        } else if (checkboxGroup[0].dataset.position === "LCWP") {
                            uncheckedLCWPCheckboxes.push(checkbox);
                        } else {
                            uncheckedOCCheckboxes.push(checkbox);
                        }
                    }
                });




                let uncheckedCheckboxesGroup = [uncheckedTLCheckboxes, uncheckedLCWPCheckboxes, uncheckedOCCheckboxes];

                // Go through unchecked staff array, and in the container, add a label and input boxes
                uncheckedCheckboxesGroup.forEach(function (group) {


                    if (group.length > 0) {
                        if (group[0].dataset.position === "TL") {
                            // ! This could also be where you are running into Issue #3
                            // TESTING - Clear container first
                            // exceptionsTLContainer.innerHTML = "";

                            // Array to group labels with inputs
                            let nodeGroups = [];

                            // Go through each childNode in exceptionsContainer and separate based on label or input
                            exceptionsTLContainer.childNodes.forEach(function (child) {
                                // If the node is a label
                                if (child.classList.contains("form-label")) {
                                    // Create an object and put the label in it
                                    let personInputObject = {
                                        "label": child
                                    };
                                    // Push object to the nodeGroups Array
                                    nodeGroups.push(personInputObject);
                                } else {
                                    // If the node is the input
                                    // Find corresponding object in nodeGroups Array
                                    let correspondingObject = nodeGroups.find(function (object) {
                                        return object.label.name === child.name;
                                    });
                                    // Add on the inputGroup to the corresponding object
                                    correspondingObject.inputGroup = child;
                                }
                            });

                            // Go through each object in the nodeGroups Array
                            // If the inputGroup has something written in either the "hours" or "minutes":
                            // push that object to the inputsToKeep Array
                            nodeGroups.forEach(function (object) {
                                if (object.inputGroup.childNodes[0].value !== "" || object.inputGroup.childNodes[2].value !== "") {
                                    inputsToKeep.push(object);
                                }
                            });
                        } else if (group[0].dataset.position === "LCWP") {
                            // Array to group labels with inputs
                            let nodeGroups = [];

                            // Go through each childNode in exceptionsContainer and separate based on label or input
                            exceptionsLCWPContainer.childNodes.forEach(function (child) {
                                // If the node is a label
                                if (child.classList.contains("form-label")) {
                                    // Create an object and put the label in it
                                    let personInputObject = {
                                        "label": child
                                    };
                                    // Push object to the nodeGroups Array
                                    nodeGroups.push(personInputObject);
                                } else {
                                    // If the node is the input
                                    // Find corresponding object in nodeGroups Array
                                    let correspondingObject = nodeGroups.find(function (object) {
                                        return object.label.name === child.name;
                                    });
                                    // Add on the inputGroup to the corresponding object
                                    correspondingObject.inputGroup = child;
                                }
                            });

                            // Go through each object in the nodeGroups Array
                            // If the inputGroup has something written in either the "hours" or "minutes":
                            // push that object to the inputsToKeep Array
                            nodeGroups.forEach(function (object) {
                                if (object.inputGroup.childNodes[0].value !== "" || object.inputGroup.childNodes[2].value !== "") {
                                    inputsToKeep.push(object);
                                }
                            });
                        } else {
                            // Array to group labels with inputs
                            let nodeGroups = [];

                            // Go through each childNode in exceptionsContainer and separate based on label or input
                            exceptionsOCContainer.childNodes.forEach(function (child) {
                                // If the node is a label
                                if (child.classList.contains("form-label")) {
                                    // Create an object and put the label in it
                                    let personInputObject = {
                                        "label": child
                                    };
                                    // Push object to the nodeGroups Array
                                    nodeGroups.push(personInputObject);
                                } else {
                                    // If the node is the input
                                    // Find corresponding object in nodeGroups Array
                                    let correspondingObject = nodeGroups.find(function (object) {
                                        return object.label.name === child.name;
                                    });
                                    // Add on the inputGroup to the corresponding object
                                    correspondingObject.inputGroup = child;
                                }
                            });

                            // Go through each object in the nodeGroups Array
                            // If the inputGroup has something written in either the "hours" or "minutes":
                            // push that object to the inputsToKeep Array
                            nodeGroups.forEach(function (object) {
                                if (object.inputGroup.childNodes[0].value !== "" || object.inputGroup.childNodes[2].value !== "") {
                                    inputsToKeep.push(object);
                                }
                            });
                        }



                        group.forEach(function (checkbox) {
                            // Check if checkbox in group's name is also the name of an object in the inputsToKeep Array
                            // If the current checkbox also belongs to someone in the inputsToKeep Array:
                            let correspondingObject = inputsToKeep.find(function (object) {
                                return object.label.name === checkbox.name;
                            });
                            // If there was a match
                            if (correspondingObject !== undefined) {
                                if (checkbox.dataset.position === "TL") {
                                    // Add a position type property to the object
                                    correspondingObject.positionType = "TL";
                                } else if (checkbox.dataset.position === "LCWP") {
                                    // Add a position type property to the object
                                    correspondingObject.positionType = "LCWP";
                                } else if (checkbox.dataset.position === "OC") {
                                    // Add a position type property to the object
                                    correspondingObject.positionType = "OC";
                                }

                                // Split up Names for later alphabetizing
                                let nameArray = correspondingObject.label.name.split(" ");
                                let firstName = nameArray[0];
                                let lastName = nameArray[1];
                                correspondingObject.firstName = firstName;
                                correspondingObject.lastName = lastName;

                                // Add this object to the inputsToAppend Array
                                inputsToAppend.push(correspondingObject);
                            } else {
                                // There was not a match, so this new person needs new labels and inputs
                                // Create them
                                let inputObject = {};

                                let formLabel = document.createElement("div");
                                formLabel.classList.add("form-label");
                                formLabel.innerHTML = "How long did " + checkbox.name + " work for?";
                                formLabel.name = checkbox.name;

                                let inputGroup = document.createElement("div");
                                inputGroup.classList.add("input-group");
                                inputGroup.name = checkbox.name;

                                let hoursInput = document.createElement("input");
                                hoursInput.type = "number";
                                hoursInput.min = "0";
                                hoursInput.max = "24";
                                hoursInput.id = `exception-hours-${checkbox.value}`;
                                hoursInput.classList.add("form-control", "verify-this");
                                hoursInput.required = "required";
                                hoursInput.addEventListener("change", validInput);
                                //hoursInput.placeholder = "How many hours were worked?";
                                // Need to add 'aria-describedby?'

                                let hoursSpanGroup = document.createElement("span");
                                hoursSpanGroup.classList.add("input-group-append");
                                hoursSpanGroup.id = "hours-span-group-" + group.indexOf(checkbox);

                                let hoursSpan = document.createElement("span");
                                hoursSpan.classList.add("input-group-text");
                                hoursSpan.innerHTML = "hours";

                                let minutesInput = document.createElement("input");
                                minutesInput.type = "number";
                                minutesInput.min = "0";
                                minutesInput.max = "45";
                                minutesInput.step = "15";
                                minutesInput.id = `exception-minutes-${checkbox.value}`;
                                minutesInput.classList.add("form-control", "verify-this");
                                minutesInput.required = "required";
                                minutesInput.addEventListener("change", validInput);
                                //minutesInput.placeholder = "How many minutes were worked?";

                                let minutesSpanGroup = document.createElement("span");
                                minutesSpanGroup.classList.add("input-group-append");
                                minutesSpanGroup.id = "minutes-span-group-" + group.indexOf(checkbox);

                                let minutesSpan = document.createElement("span");
                                minutesSpan.classList.add("input-group-text");
                                minutesSpan.innerHTML = "minutes";

                                // ! Getting rid of this should stop it from displaying the boxes at all...?

                                /*
                                if (checkbox.dataset.position === "TL") {
                                    exceptionsTLContainer.appendChild(formLabel);
                                    exceptionsTLContainer.appendChild(inputGroup);
                                } else if (checkbox.dataset.position === "LCWP") {
                                    exceptionsLCWPContainer.appendChild(formLabel);
                                    exceptionsLCWPContainer.appendChild(inputGroup);
                                } else {
                                    exceptionsOCContainer.appendChild(formLabel);
                                    exceptionsOCContainer.appendChild(inputGroup);
                                }
                                */


                                inputGroup.appendChild(hoursInput);
                                inputGroup.appendChild(hoursSpanGroup);
                                hoursSpanGroup.appendChild(hoursSpan);
                                inputGroup.appendChild(minutesInput);
                                inputGroup.appendChild(minutesSpanGroup);
                                minutesSpanGroup.appendChild(minutesSpan);

                                // Push the inputObject to the newInputs Array
                                allNewInputs.push(inputObject);

                                // Push the object to the inputsToKeep Array
                                inputsToKeep.push(inputObject);

                                // Push the label and inputGroup to the inputObject.
                                inputObject.label = formLabel;
                                inputObject.inputGroup = inputGroup;
                                // Split up Names for later alphabetizing
                                let nameArray = formLabel.name.split(" ");
                                let firstName = nameArray[0];
                                let lastName = nameArray[1];
                                inputObject.firstName = firstName;
                                inputObject.lastName = lastName;

                                if (checkbox.dataset.position === "TL") {
                                    // Add a position type property to the object
                                    inputObject.positionType = "TL";
                                } else if (checkbox.dataset.position === "LCWP") {
                                    // Add a position type property to the object
                                    inputObject.positionType = "LCWP";
                                } else {
                                    // Add a position type property to the object
                                    inputObject.positionType = "OC";
                                }

                                // Add this object to the inputsToAppend Array
                                inputsToAppend.push(inputObject);
                            }
                        });
                    }
                });
            } else if (checkboxGroup.every(isChecked)) {
                // No exceptions
                // Hide the title and the warning
                if (checkboxGroup[0].dataset.position === "TL") {
                    hideThis(exceptionsTitleTL, exceptionsWarningTL, exceptionsTLContainer);
                } else if (checkboxGroup[0].dataset.position === "LCWP") {
                    hideThis(exceptionsTitleLCWP, exceptionsWarningLCWP, exceptionsLCWPContainer);
                } else {
                    hideThis(exceptionsTitleOC, exceptionsWarningOC, exceptionsOCContainer);
                }
            } else {
                //hideThis(allExceptionsTitles);
                //hideThis(allExceptionsContainers);
                // Possibly need to worry about clearing those values!?
            }
        } else {
            console.group("Empty CheckboxGroup");
            console.warn("checkboxGroup is empty.");
            console.log(name);
            console.groupEnd();
        }
    });

    // Clear all exeptionContainers
    allExceptionsContainers.forEach(function (container) {
        container.innerHTML = "";
    });

    // Append the inputs from the inputsToAppend Array depending on positionType
    inputsToAppend.forEach(function (object) {
        if (object.positionType === "TL") {
            exceptionsTLContainer.appendChild(object.label);
            exceptionsTLContainer.appendChild(object.inputGroup);
        } else if (object.positionType === "LCWP") {
            exceptionsLCWPContainer.appendChild(object.label);
            exceptionsLCWPContainer.appendChild(object.inputGroup);
        } else if (object.positionType === "OC") {
            exceptionsOCContainer.appendChild(object.label);
            exceptionsOCContainer.appendChild(object.inputGroup);
        }
    });
}

function sickSwitched() {
    if (this.checked) {
        if (this.dataset.position === "TL") {
            tlSickSwitchSpan.innerHTML = "<strong>Yes</strong>";
            showThis(sickStaffTLTitle);
            createSickStaff("TL");
        } else if (this.dataset.position === "LCWP") {
            lcwpSickSwitchSpan.innerHTML = "<strong>Yes</strong>";
            showThis(sickStaffLCWPTitle);
            createSickStaff("LCWP");
        } else {
            ocSickSwitchSpan.innerHTML = "<strong>Yes</strong>";
            showThis(sickStaffOCTitle);
            createSickStaff("OC");
        }
    } else {
        if (this.dataset.position === "TL") {
            tlSickSwitchSpan.innerHTML = "No";
            hideThis(sickStaffTLTitle);
            // Clear list of sick Team Leaders
            sickStaffTLContainer.innerHTML = "";
            sickExceptionsTLContainer.innerHTML = "";
            sickTLCheckboxes = [];
        } else if (this.dataset.position === "LCWP") {
            lcwpSickSwitchSpan.innerHTML = "No";
            hideThis(sickStaffLCWPTitle);
            // Clear list of sick LC/WP's
            sickStaffLCWPContainer.innerHTML = "";
            sickExceptionsLCWPContainer.innerHTML = "";
            sickLCWPCheckboxes = [];
        } else {
            ocSickSwitchSpan.innerHTML = "No";
            hideThis(sickStaffOCTitle);
            // Clear list of sick Office Coordinators
            sickStaffOCContainer.innerHTML = "";
            sickExceptionsOCContainer.innerHTML = "";
            sickOCCheckboxes = [];
        }
    }
}

function createSickStaff(positionType) {
    // Probably going to run into a problem right here. 
    // If you create sick staff individually based on the corresponding switch,
    // Don't clear the containers regardless. Set up logic to check if the switch
    // was toggled, and if you need to clear out that sick container.

    // Todo: Fix this issue.
    /* Test logic 6/19 
    if (positionType === "TL") {
        exceptionsTLContainer.innerHTML = "";
    } else if (positionType === "LCWP") {
        exceptionsLCWPContainer.innerHTML = "";
    } else {
        exceptionsOCContainer.innerHTML = "";
    }
    */



    /*
    // Clear list of Sick Staff
    allSickExceptionsContainers.forEach(function (container) {
        container.innerHTML = "";
    });
    */

    // Who is working this particular camp
    let staffMembersWorking = [];

    // Go through list of all staff members, and add them to the list if they are working this camp
    staffMembersAll.forEach(function (person) {
        if (person.campsWorking.includes(currentCamp)) {
            staffMembersWorking.push(person);
        }
    });

    // Go through staff members working, and make a new array if the person is going to be a [TL, LC, WP, OC]
    let staffMembersWorkingTL = staffMembersWorking.filter(isTL);
    let staffMembersWorkingLC = staffMembersWorking.filter(isLC);
    let staffMembersWorkingWP = staffMembersWorking.filter(isWP);
    let staffMembersWorkingOC = staffMembersWorking.filter(isOC);

    let staffMemberGroups = [staffMembersWorkingTL, staffMembersWorkingLC, staffMembersWorkingWP, staffMembersWorkingOC];

    // Sort each group of staff members alphabetically by last name
    staffMemberGroups.forEach(function (group) {
        group.sort(compareValues('lastName'));
    });


    // For each staff member group, add a label, checkbox, and span for each person in the appropriate location
    // IF THE CORRESPONDING SICK SWITCH WAS TOGGLED TO YES
    staffMemberGroups.forEach(function (group) {
        if (group === staffMembersWorkingTL && positionType === "TL") {
            // Create sick TL's
            group.forEach(function (person) {
                let label = document.createElement('label');
                label.classList.add("custom-control", "custom-checkbox");

                let checkbox = document.createElement('input');
                checkbox.type = "checkbox";
                checkbox.classList.add("custom-control-input");
                checkbox.name = `${person.firstName}` + " " + `${person.lastName}`;
                checkbox.value = `${person.firstName}` + `${person.lastName}`;
                checkbox.id = `${person.firstName}`.toLowerCase() + "-" + `${person.lastName}`.toLowerCase() + "-sick";
                checkbox.checked = false;
                checkbox.dataset.positiontype = "TL";
                checkbox.addEventListener("change", checkSick);

                let span = document.createElement("span");
                span.classList.add("custom-control-label");
                span.innerHTML = "<em>(" + `${person.position1}` + ")</em> " + `${person.firstName}` + " " + `${person.lastName}`;

                // You only want to actually append and create these things, if the corresponding
                // sick switch was toggled. Otherwise you are making sick staff for every position
                // regardless of which switch was toggled

                checkbox.dataset.position = "TL";
                sickStaffTLContainer.appendChild(label);
                label.appendChild(checkbox);
                label.appendChild(span);
                sickTLCheckboxes.push(checkbox);
            });
        } else if ((group === staffMembersWorkingLC || group === staffMembersWorkingWP) && (positionType === "LCWP")) {
            // Create sick LC's and WP's
            group.forEach(function (person) {
                let label = document.createElement('label');
                label.classList.add("custom-control", "custom-checkbox");

                let checkbox = document.createElement('input');
                checkbox.type = "checkbox";
                checkbox.classList.add("custom-control-input");
                checkbox.name = `${person.firstName}` + " " + `${person.lastName}`;
                checkbox.value = `${person.firstName}` + `${person.lastName}`;
                checkbox.id = `${person.firstName}`.toLowerCase() + "-" + `${person.lastName}`.toLowerCase() + "-sick";
                checkbox.checked = false;
                checkbox.dataset.positiontype = "LCWP";
                checkbox.addEventListener("change", checkSick);

                let span = document.createElement("span");
                span.classList.add("custom-control-label");
                span.innerHTML = "<em>(" + `${person.position1}` + ")</em> " + `${person.firstName}` + " " + `${person.lastName}`;

                // You only want to actually append and create these things, if the corresponding
                // sick switch was toggled. Otherwise you are making sick staff for every position
                // regardless of which switch was toggled

                checkbox.dataset.position = "LCWP";
                sickStaffLCWPContainer.appendChild(label);
                label.appendChild(checkbox);
                label.appendChild(span);
                sickLCWPCheckboxes.push(checkbox);
            });
        } else if (group === staffMembersWorkingOC && positionType === "OC") {
            // Create sick OC's
            group.forEach(function (person) {
                let label = document.createElement('label');
                label.classList.add("custom-control", "custom-checkbox");

                let checkbox = document.createElement('input');
                checkbox.type = "checkbox";
                checkbox.classList.add("custom-control-input");
                checkbox.name = `${person.firstName}` + " " + `${person.lastName}`;
                checkbox.value = `${person.firstName}` + `${person.lastName}`;
                checkbox.id = `${person.firstName}`.toLowerCase() + "-" + `${person.lastName}`.toLowerCase() + "-sick";
                checkbox.checked = false;
                checkbox.dataset.positionType = "OC";
                checkbox.addEventListener("change", checkSick);

                let span = document.createElement("span");
                span.classList.add("custom-control-label");
                span.innerHTML = "<em>(" + `${person.position1}` + ")</em> " + `${person.firstName}` + " " + `${person.lastName}`;

                // You only want to actually append and create these things, if the corresponding
                // sick switch was toggled. Otherwise you are making sick staff for every position
                // regardless of which switch was toggled

                checkbox.dataset.position = "OC";
                sickStaffOCContainer.appendChild(label);
                label.appendChild(checkbox);
                label.appendChild(span);
                sickOCCheckboxes.push(checkbox);
            });
        } else {}
    });
}

function checkSick() {

    if (this.dataset.positiontype === "TL") {
        sickExceptionsTLContainer.innerHTML = "";
        checkedSickTLCheckboxes = [];
    } else if (this.dataset.positiontype === "LCWP") {
        sickExceptionsLCWPContainer.innerHTML = "";
        checkedSickLCWPCheckboxes = [];
    } else {
        sickExceptionsOCContainer.innerHTML = "";
        checkedSickOCCheckboxes = [];
    }
    /*
    // Clear list of exceptions
    allSickExceptionsContainers.forEach(function (container) {
        container.innerHTML = "";
    });
    */


    let allSickCheckboxes = [sickTLCheckboxes, sickLCWPCheckboxes, sickOCCheckboxes];

    allSickCheckboxes.forEach(function (checkboxGroup) {
        if (checkboxGroup.some(isChecked)) {
            // Clear the array of checked checkboxes
            // FIX?
            let checkboxes = checkboxGroup;

            if (checkboxGroup[0].dataset.position === "TL") {
                // Show the Title and the Container itself
                showThis(sickExceptionsTitleTL, sickExceptionsTLContainer);
                tlIsSick = true;
                checkedSickTLCheckboxes = [];
            } else if (checkboxGroup[0].dataset.position === "LCWP") {
                // Show the Title and the Container itself
                showThis(sickExceptionsTitleLCWP, sickExceptionsLCWPContainer);
                lcwpIsSick = true;
                checkedSickLCWPCheckboxes = [];
            } else {
                // Show the Title and the Container itself
                showThis(sickExceptionsTitleOC, sickExceptionsOCContainer);
                ocIsSick = true;
                checkedSickOCCheckboxes = [];
            }



            // Go through checkboxes, if one is checked, add it to the array
            checkboxes.forEach(function (checkbox) {
                if (checkbox.checked === true) {
                    if (checkboxGroup[0].dataset.position === "TL") {
                        //checkedSickTLCheckboxes = [];
                        checkedSickTLCheckboxes.push(checkbox);
                    } else if (checkboxGroup[0].dataset.position === "LCWP") {
                        //checkedSickLCWPCheckboxes = [];
                        checkedSickLCWPCheckboxes.push(checkbox);
                    } else {
                        //checkedSickOCCheckboxes = [];
                        checkedSickOCCheckboxes.push(checkbox);
                    }
                }
            });

            /*
            STOPPING SICK HOUR CHECKS.
            IF NEEDED, PUT BACK IN. FOR NOW, JUST ADD THE SICK STAFF MEMBER TO THE
            CORRESPONDING ARRAY
            */

            let checkedCheckboxesGroup = [checkedSickTLCheckboxes, checkedSickLCWPCheckboxes, checkedSickOCCheckboxes];

            // Go through checked staff array, and in the container, add a label and input boxes
            checkedCheckboxesGroup.forEach(function (group) {
                if (group.length > 0) {
                    if (group[0].dataset.position === "TL") {
                        // TESTING - Clear container first
                        sickExceptionsTLContainer.innerHTML = "";
                    } else if (group[0].dataset.position === "LCWP") {
                        // TESTING - Clear container first
                        sickExceptionsLCWPContainer.innerHTML = "";
                    } else {
                        // TESTING - Clear container first
                        sickExceptionsOCContainer.innerHTML = "";
                    }

                    group.forEach(function (checkbox) {
                        let formLabel = document.createElement("div");
                        formLabel.classList.add("form-label");
                        formLabel.innerHTML = "How long was " + checkbox.name + " sick for?";
                        formLabel.name = checkbox.name;

                        let inputGroup = document.createElement("div");
                        inputGroup.classList.add("input-group");
                        inputGroup.name = checkbox.name;

                        let hoursInput = document.createElement("input");
                        hoursInput.type = "number";
                        hoursInput.min = "0";
                        hoursInput.max = "8";
                        hoursInput.classList.add("form-control", "verify-this");
                        hoursInput.required = "required";
                        hoursInput.addEventListener("change", validInput);
                        //hoursInput.placeholder = "How many hours were worked?";
                        // Need to add 'aria-describedby?'

                        let hoursSpanGroup = document.createElement("span");
                        hoursSpanGroup.classList.add("input-group-append");
                        hoursSpanGroup.id = "hours-span-group-" + group.indexOf(checkbox);

                        let hoursSpan = document.createElement("span");
                        hoursSpan.classList.add("input-group-text");
                        hoursSpan.innerHTML = "hours";

                        let minutesInput = document.createElement("input");
                        minutesInput.type = "number";
                        minutesInput.min = "0";
                        minutesInput.max = "45";
                        minutesInput.step = "15";
                        minutesInput.classList.add("form-control", "verify-this");
                        minutesInput.required = "required";
                        minutesInput.addEventListener("change", validInput);
                        //minutesInput.placeholder = "How many minutes were worked?";

                        let minutesSpanGroup = document.createElement("span");
                        minutesSpanGroup.classList.add("input-group-append");
                        minutesSpanGroup.id = "minutes-span-group-" + group.indexOf(checkbox);

                        let minutesSpan = document.createElement("span");
                        minutesSpan.classList.add("input-group-text");
                        minutesSpan.innerHTML = "minutes";

                        if (checkbox.dataset.position === "TL") {
                            sickExceptionsTLContainer.appendChild(formLabel);
                            sickExceptionsTLContainer.appendChild(inputGroup);
                        } else if (checkbox.dataset.position === "LCWP") {
                            sickExceptionsLCWPContainer.appendChild(formLabel);
                            sickExceptionsLCWPContainer.appendChild(inputGroup);
                        } else {
                            sickExceptionsOCContainer.appendChild(formLabel);
                            sickExceptionsOCContainer.appendChild(inputGroup);
                        }


                        inputGroup.appendChild(hoursInput);
                        inputGroup.appendChild(hoursSpanGroup);
                        hoursSpanGroup.appendChild(hoursSpan);
                        inputGroup.appendChild(minutesInput);
                        inputGroup.appendChild(minutesSpanGroup);
                        minutesSpanGroup.appendChild(minutesSpan);
                    });
                }
            });

        } else if (checkboxGroup.every(isUnchecked)) {
            // No sick staff
            let sickCheckList = [tlSickSwitchInput, lcwpSickSwitchInput, ocSickSwitchInput];

            sickCheckList.forEach(function (sickSwitch) {
                if (sickSwitch.checked === false) {
                    if (sickSwitch.dataset.position === "TL") {
                        hideThis(sickExceptionsTitleTL, sickExceptionsTLContainer);
                        tlIsSick = false;
                        checkedSickTLCheckboxes = [];
                    } else if (sickSwitch.dataset.position === "LCWP") {
                        hideThis(sickExceptionsTitleLCWP, sickExceptionsLCWPContainer);
                        lcwpIsSick = false;
                        checkedSickLCWPCheckboxes = [];
                    } else {
                        hideThis(sickExceptionsTitleOC, sickExceptionsOCContainer);
                        ocIsSick = false;
                        checkedSickOCCheckboxes = [];
                    }
                }
            });
        } else {
            //hideThis(allExceptionsTitles);
            //hideThis(allExceptionsContainers);
            // Possibly need to worry about clearing those values!?
        }
    });
}

function resetInfo() {
    // Reset hours worked
    hoursWorkedTL.value = "";
    hoursWorkedLCWP.value = "";
    hoursWorkedOC.value = "";

    // Clear lists
    allStaffMembersContainers.forEach(function (container) {
        container.innerHTML = "";
    });

    allSickExceptionsContainers.forEach(function (container) {
        container.innerHTML = "";
    });

    allExceptionsContainers.forEach(function (container) {
        container.innerHTML = "";
    });

    // Flip sick switches to "no"
    allSickSwitchInputs.forEach(function (input) {
        input.checked = false;
    });

    allSickSwitchSpans.forEach(function (span) {
        span.innerHTML = "No";
    });

    // Hide titles
    hideThis(allExceptionsTitles);
    hideThis(allSickTitles);

    allTypesCheckboxes.forEach(function (checkboxArray) {
        checkboxArray = [];
    });
}


function setHoursWorked(tlHours, lcwpHours, ocHours) {
    hoursWorkedTL.value = tlHours;
    hoursWorkedLCWP.value = lcwpHours;
    hoursWorkedOC.value = ocHours;
}

function showPositionCards() {
    // First, make sure all info is entered
    if (isSiteInfoValid() === true) {
        // SW, UCF, and VILLA have no OC. Hide the OC form
        if (chosenSite === "stan") {
            showThis(tlCard, lcwpCard, ocCard);
            addPreviewButton(ocCard);
        } else {
            showThis(tlCard, lcwpCard);
            addPreviewButton(lcwpCard);
        }
        allPositionCards.forEach(function (card) {
            card.classList.add("animated", "slideInUp");
        });
        hideThis(continueButtonContainer);
        setTimeout(scrollToTLCard, 1500);
        assignUserInfo();
    } else {
        let invalidItems = isSiteInfoValid();
        invalidItems.forEach(function (invalidItem) {
            invalidItem.classList.add("is-invalid");
        });
    }
}

function assignUserInfo() {
    userInformation.firstName = firstName.value;
    userInformation.lastName = lastName.value;
    userInformation.site = chosenSite;
    userInformation.userName = firstName.value.concat(" ", lastName.value);

    LogRocket.identify(userInformation.userName, {
        userName: userInformation.userName,
        firstName: userInformation.firstName,
        lastName: userInformation.lastName,
        site: userInformation.site
    });
}

function scrollToTLCard() {
    tlCard.scrollIntoView({
        behavior: 'smooth'
    });
}

function isSiteInfoValid() {
    // If everything in the Site Info card is valid
    if (firstName.classList.contains("is-valid") && lastName.classList.contains("is-valid") && allSiteInputs.some(isChecked) && allCamps.some(isChecked)) {
        return true;
    } else {
        let invalidItems = [];

        if (firstName.value === "" || firstName.length < 3) {
            invalidItems.push(firstName);
            showThis(invalidFeedbackFirstName);
        }

        if (lastName.value === "" || lastName.length < 3) {
            invalidItems.push(lastName);
            showThis(invalidFeedbackLastName);
        }

        if (allSiteInputs.every(isUnchecked)) {
            //invalidItems.push(allSiteInputs);
            showThis(invalidFeedbackSite);
        }

        if (allCamps.every(isUnchecked)) {
            //invalidItems.push(allCamps);
            showThis(invalidFeedbackCamp);
        }

        return invalidItems;
    }
}

function checkName() {
    let value = this.value;

    // If the name isn't blank, and is longer than 2 characters
    if (value !== "" && value.length > 2) {
        this.classList.remove("is-invalid");
        this.classList.add("is-valid");
        this.classList.add("state-valid");
    } else {
        // Name is invalid
        this.classList.remove("is-valid");
        this.classList.remove("state-valid");
    }
}

function checkEmptyPositions() {
    // There is no OC at SW, UCF, or VILLA
    if (chosenSite === "sw" || chosenSite === "ucf" || chosenSite === "villa") {
        if (tlCard.classList.contains("hidden")) {
            // Cards have not yet been shown
            // No need to hide the OC card
        } else {
            // Cards are visible, need to hide OC card
            hideThis(ocCard);
        }
    } else if (chosenSite === "stan") {
        if (tlCard.classList.contains("hidden")) {
            // Cards have not yet been shown
            // No need to show the OC card
        } else {
            // Cards are visible, need to show the OC card
            showThis(ocCard);
        }
    }
}

function addPreviewButton(location) {
    let footerDiv = document.createElement('div');
    footerDiv.classList.add('card-footer', 'text-right');

    let buttonContainer = document.createElement('div');
    buttonContainer.classList.add('d-flex');

    let button = document.createElement('button');
    button.type = "button";
    button.id = "preview-button";
    button.classList.add("btn", "btn-primary", "ml-auto");
    button.innerHTML = "Preview Data";
    button.addEventListener("click", previewData);

    footerDiv.appendChild(buttonContainer);
    buttonContainer.appendChild(button);

    location.appendChild(footerDiv);
}

function addFinalButtons(location) {
    let footerDiv = document.createElement('div');
    footerDiv.classList.add('card-footer', 'text-right');

    let submitButton = document.createElement('button');
    submitButton.type = "submit";
    submitButton.id = "send-data-button";
    submitButton.classList.add("btn", "btn-primary");
    submitButton.innerHTML = "Submit";

    let cancelButton = document.createElement("button");
    cancelButton.type = "button";
    cancelButton.id = "cancel-button";
    cancelButton.classList.add("btn", "btn-secondary");
    cancelButton.innerHTML = "Cancel";
    cancelButton.style.marginRight = "10px";
    cancelButton.addEventListener("click", goBackToForm);

    footerDiv.appendChild(cancelButton);
    footerDiv.appendChild(submitButton);
    location.appendChild(footerDiv);
}

function goBackToForm() {
    // Scroll to top
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
    setTimeout(slideInItems, 500);

    function slideInItems() {
        // First, slide out the preview card contents
        alert.classList.add("animated", "slideOutRight");
        mainForm.firstChild.classList.add("animated", "slideOutRight");
        mainForm.firstChild.remove();

        // Recreate initial alert
        span1.innerHTML = "Need help? ";
        alert.appendChild(span1);
        alert.appendChild(alertLink);
        alert.appendChild(span2);
        alert.classList.remove("slideOutRight", "slideInRight");
        alert.classList.add("animated", "slideInLeft");

        showThis(siteInfoCard);
        siteInfoCard.classList.remove("slideOutLeft");
        siteInfoCard.classList.add("animated", "slideInLeft");
        allPositionCards.forEach(function (card) {
            if (chosenSite !== "sw") {
                showThis(card);
                card.classList.remove("slideOutLeft");
                card.classList.add("animated", "slideInLeft");
            } else {
                if (card !== ocCard) {
                    showThis(card);
                    card.classList.remove("slideOutLeft");
                    card.classList.add("animated", "slideInLeft");
                }
            }
        });
    }
}


// Helper functions
function showThis() {
    let thingsToShow = arguments;
    for (let i = 0; i < thingsToShow.length; i++) {
        let currentThing = thingsToShow[i];
        currentThing.classList.remove("hidden");
    }
}

function hideThis() {
    // If there is only one item to hide
    if (arguments[0].constructor === HTMLDivElement) {
        let thingsToHide = arguments;
        for (let i = 0; i < thingsToHide.length; i++) {
            let currentThing = thingsToHide[i];
            if (currentThing.classList.contains("hidden")) {} else {
                currentThing.classList.add("hidden");
            }
        }
    } else if (arguments[0].constructor === Array) {
        // There is an array of items to hide
        let numberOfThingsToHide = arguments[0].length;
        for (let i = 0; i < numberOfThingsToHide; i++) {
            let currentThing = arguments[0][i];
            if (currentThing.classList.contains("hidden")) {} else {
                currentThing.classList.add("hidden");
            }
        }
    }
}

function compareValues(key, order = 'asc') {
    return function (a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            // property doesn't exist on either object
            return 0;
        }

        const varA = (typeof a[key] === 'string') ?
            a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === 'string') ?
            b[key].toUpperCase() : b[key];

        let comparison = 0;
        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }
        return (
            (order == 'desc') ? (comparison * -1) : comparison
        );
    };
}

function isUnchecked(checkbox) {
    return checkbox.checked === false;
}

function isChecked(checkbox) {
    return checkbox.checked === true;
}

function isTL(person) {
    // Check to see if this person is a "Special Staff Member"
    // * Special Staff Member would be someone working a different position at a different camp
    // * See Yolanda Drew for a good example
    if (person.specialStaffMember !== undefined) {
        return person.specialStaffMember[0].camps[`${currentCamp}`] === "TL" || person.specialStaffMember[0].camps[`${currentCamp}`] === "STL";
    } else {
        return person.position1 === "TL" || person.position1 === "STL" || person.position2 === "TL" || person.position2 === "STL";
    }
}

function isLC(person) {
    // Check to see if this person is a "Special Staff Member"
    // * Special Staff Member would be someone working a different position at a different camp
    // * See Yolanda Drew for a good example
    if (person.specialStaffMember !== undefined) {
        return person.specialStaffMember[0].camps[`${currentCamp}`] === "LC";
    } else {
        return person.position1 === "LC";
    }
}

function isWP(person) {
    // Check to see if this person is a "Special Staff Member"
    // * Special Staff Member would be someone working a different position at a different camp
    // * See Yolanda Drew for a good example
    if (person.specialStaffMember !== undefined) {
        return person.specialStaffMember[0].camps[`${currentCamp}`] === "WP";
    } else {
        return person.position1 === "WP";
    }
}

function isOC(person) {
    // Check to see if this person is a "Special Staff Member"
    // * Special Staff Member would be someone working a different position at a different camp
    // * See Yolanda Drew for a good example
    if (person.specialStaffMember !== undefined) {
        return person.specialStaffMember[0].camps[`${currentCamp}`] === "OC";
    } else {
        return person.position1 === "OC";
    }
}

function isInvalid(item) {
    return item.classList.contains("is-invalid");
}

function logThis() {
    let variablesToLog = arguments;
    for (let i = 0; i < variablesToLog.length; i++) {
        let currentVariable = variablesToLog[i];
        console.log(currentVariable);
    }
}

function setBlank() {
    firstName.value = "";
    lastName.value = "";
    allSiteInputs.forEach(function (siteInput) {
        siteInput.checked = false;
    });
    allSickSwitchInputs.forEach(function (switchInput) {
        switchInput.checked = false;
    });
    allCamps.forEach(function (campInput) {
        campInput.checked = false;
    });
    dateMonth.value = "";
    dateDay.value = "";
}

function clearThis(thingsToClear) {
    thingsToClear.forEach(function (thingToClear) {
        thingToClear.length = 0;
    });
}

function buildPreviewCard(document) {
    let previewCardDiv = document.createElement("div");
    previewCardDiv.id = "preview-card";
    previewCardDiv.classList.add("card", "hidden");

    // Header Div
    let headerDiv = document.createElement("div");
    headerDiv.classList.add("card-header");
    previewCardDiv.appendChild(headerDiv);

    // Header
    let header = document.createElement("h3");
    header.classList.add("card-title");
    header.innerHTML = "Preview Information";
    headerDiv.appendChild(header);

    // Body Div
    let body = document.createElement("div");
    body.classList.add("card-body");
    previewCardDiv.appendChild(body);

    // Information Row
    let infoRow = document.createElement("div");
    infoRow.id = "info-row";
    infoRow.classList.add("row", "justify-content-center", "text-center");
    body.appendChild(infoRow);

    // Centered Info Column
    let infoColumn = document.createElement("div");
    infoColumn.classList.add("col-sm-10");
    infoColumn.id = "info-column";
    infoRow.appendChild(infoColumn);

    // General Information Heading Container
    let infoHeadingDiv = document.createElement("div");
    infoHeadingDiv.classList.add("form-group", "text-center");
    infoHeadingDiv.id = "general-info-heading-div";
    infoColumn.appendChild(infoHeadingDiv);

    // General Information Heading
    let infoHeading = document.createElement("h4");
    infoHeading.innerHTML = "General Information";
    infoHeadingDiv.appendChild(infoHeading);

    // General Information Inner Row
    let infoInnerRow = document.createElement("div");
    infoInnerRow.id = "general-information-inner-row";
    infoInnerRow.classList.add("row", "justify-content-center", "text-center");
    infoColumn.appendChild(infoInnerRow);

    // General Information Form Group 1
    let infoFormGroup1 = document.createElement("div");
    infoFormGroup1.id = "info-form-group-1";
    infoFormGroup1.classList.add("form-group", "col-md-6");
    infoInnerRow.appendChild(infoFormGroup1);

    // General Information Form Group 2
    let infoFormGroup2 = document.createElement("div");
    infoFormGroup2.id = "info-form-group-1";
    infoFormGroup2.classList.add("form-group", "col-md-6");
    infoInnerRow.appendChild(infoFormGroup2);

    // Name
    let nameLabel = document.createElement("div");
    nameLabel.id = "name-label";
    nameLabel.classList.add("form-label");
    nameLabel.innerHTML = "Your Name";
    infoFormGroup1.appendChild(nameLabel);
    let nameValue = document.createElement("div");
    nameValue.id = "name-value";
    nameValue.classList.add("form-control-plaintext");
    nameValue.innerHTML = firstName.value + " " + lastName.value;
    infoFormGroup1.appendChild(nameValue);

    // Site
    let siteLabel = document.createElement("div");
    siteLabel.id = "site-label";
    siteLabel.classList.add("form-label");
    siteLabel.innerHTML = "Site";
    infoFormGroup1.appendChild(siteLabel);
    let siteValue = document.createElement("div");
    siteValue.id = "site-value";
    siteValue.classList.add("form-control-plaintext");
    if (chosenSite === "sw") {
        siteValue.innerHTML = "Southwestern University";
    } else if (chosenSite === "stan") {
        siteValue.innerHTML = "Stanford University";
    } else if (chosenSite === "ucf") {
        siteValue.innerHTML = "University of Central Florida";
    } else {
        siteValue.innerHTML = "Villanova University";
    }
    infoFormGroup1.appendChild(siteValue);

    // Date
    let dateLabel = document.createElement("div");
    dateLabel.id = "date-label";
    dateLabel.classList.add("form-label");
    dateLabel.innerHTML = "Date";
    infoFormGroup2.appendChild(dateLabel);
    let dateValue = document.createElement("div");
    dateValue.id = "date-value";
    dateValue.classList.add("form-control-plaintext");
    let monthValue = "";
    if (dateMonth.value === "6") {
        monthValue = "June";
    } else if (dateMonth.value === "7") {
        monthValue = "July";
    } else {
        monthValue = "August";
    }
    dateValue.innerHTML = monthValue + " " + dateDay.value;
    infoFormGroup2.appendChild(dateValue);

    // Camp
    let campLabel = document.createElement("div");
    campLabel.id = "camp-label";
    campLabel.classList.add("form-label");
    campLabel.innerHTML = "Camp";
    infoFormGroup2.appendChild(campLabel);
    let campValue = document.createElement("div");
    campValue.id = "camp-value";
    campValue.classList.add("form-control-plaintext");
    campValue.innerHTML = currentCampValue;
    infoFormGroup2.appendChild(campValue);

    // Positions Row
    let positionsRow = document.createElement("div");
    positionsRow.id = "positions-row";
    positionsRow.classList.add("row", "justify-content-center");
    body.appendChild(positionsRow);

    // Centered Positions Column
    let positionsColumn = document.createElement("div");
    positionsColumn.classList.add("col-sm-10");
    positionsColumn.id = "positions-column";
    positionsRow.appendChild(positionsColumn);

    // Positions Information Heading Container
    let positionsHeadingDiv = document.createElement("div");
    positionsHeadingDiv.classList.add("form-group", "text-center");
    positionsHeadingDiv.id = "positions-heading-div";
    positionsColumn.appendChild(positionsHeadingDiv);

    // Position Information Heading
    let positionHeading = document.createElement("h4");
    positionHeading.innerHTML = "Position Information";
    positionsHeadingDiv.appendChild(positionHeading);

    // TL Column
    let tlColumn = document.createElement("div");
    tlColumn.id = "tl-column";
    tlColumn.classList.add("col-sm-6", "col-lg-4", "text-center");
    positionsRow.appendChild(tlColumn);

    // LCWP Column
    let lcwpColumn = document.createElement("div");
    lcwpColumn.id = "lcwp-column";
    lcwpColumn.classList.add("col-sm-6", "col-lg-4", "text-center");
    positionsRow.appendChild(lcwpColumn);

    // OC Column
    let ocColumn = document.createElement("div");
    ocColumn.id = "oc-column";
    ocColumn.classList.add("col-sm-6", "col-lg-4", "text-center");
    positionsRow.appendChild(ocColumn);
}

function fillStaffArrays(checkbox) {
    let checkboxes = [tlCheckboxes, lcCheckboxes, wpCheckboxes, ocCheckboxes];
    let workingArrays = [workingTLs, workingLCs, workingWPs, workingOCs];
    let exceptionArray = [exceptionTLs, exceptionLCs, exceptionWPs, exceptionOCs];

    checkboxes.forEach(function (checkboxArray) {
        let currentArrayIndex = checkboxes.indexOf(checkboxArray);

        checkboxArray.forEach(function (input) {
            if (input.checked === true) {
                workingArrays[currentArrayIndex].push(input.name);
            } else {
                exceptionArray[currentArrayIndex].push(input.name);
            }
        });
    });
}

function previewData() {
    // * Called on by clicking the previewButton
    // * This Preview SHOULD:
    // * 1. Check to see if the info is valid first
    // * 2. Build a the preview card
    // ? Maybe in the future, just make this in the HTML file itself
    // * 3. Append info from the other card to the newly built preview card


    function createColumnElements() {
        // Position Groups
        let groups = ["TL", "LCWP", "OC"];

        groups.forEach(function (group) {
            let formGroup = "";
            let formLabel = "";
            // Exceptions Container
            let exceptionsContainer = "";
            // Sick Exceptions Container
            let sickExceptionsContainer = "";
            // Array that will hold individual objects per person for their info
            let infoArray = [];
            // Array that will hold individual objects per person for sick info
            let sickInfoArray = [];


            if (group === "TL") {
                // Create a formGroup to hold the group together
                formGroup = createCustomElement({
                    "type": "div",
                    "classesToAdd": ["form-group"]
                });

                // Create the label that will eventually describe the inputs
                formLabel = createCustomElement({
                    "type": "div",
                    "id": "tl-label",
                    "classesToAdd": ["form-label"],
                    "innerHTML": "Team Leaders"
                });

                // Append the label to the group
                formGroup.appendChild(formLabel);

                // Check to see if there are any regular TLs
                if (workingTLs.length > 0) {
                    // Create regTLValue element
                    let regTLValue = createCustomElement({
                        "type": "div",
                        "id": "reg-tl-value",
                        "classesToAdd": ["form-control-plaintext"],
                        "innerHTML": createWorkingString("TL")
                    });

                    // Append the regTLValue to the formGroup
                    formGroup.appendChild(regTLValue);
                } else {
                    // There are no regular TLs workings
                }

                // Assign appropriate Exceptions Container
                exceptionsContainer = exceptionsTLContainer;

                // Assign appropriate Sick Exceptions Container
                sickExceptionsContainer = sickExceptionsTLContainer;

                // Assign appropriate Info Array
                infoArray = exceptionTLsInfo;

                // Assign appropriate sick Info Array
                sickInfoArray = sickTLsInfo;

                // Go through each child node in exceptions container
                // Assign name, hours, and minutes
                // Will also check empty inputs and assign "is-invalid" if empty
                assignExceptionInfo(exceptionsContainer, infoArray, false);

                // You now have an array of objects for each person containing:
                // Their name, their hours, and their minutes
                // Create labels for each exception Team Leader
                createLabels(infoArray, formGroup, false);

                // Check if any TL was sick
                if (tlIsSick === true) {
                    // Go through each child node in the sick exceptions container
                    // Assign name, hours, and minutes
                    // Will also check empty inputs and assign "is-invalid" if empty
                    // ? Do you need to check this for sick inputs?
                    assignExceptionInfo(sickExceptionsContainer, sickInfoArray, true);

                    // Create labels for the sick Team Leaders
                    createLabels(sickInfoArray, formGroup, true);
                } else {
                    // No Team Leader was sick
                    // Create custom element to let user know no TL was sick
                    let noSickValue = createCustomElement({
                        "type": "div",
                        "id": "no-sick-tl",
                        "classesToAdd": ["form-control-plaintext"],
                        "innerHTML": "<em>No Team Leader was sick on this day</em>."
                    });

                    // Append this info to formGroup
                    formGroup.appendChild(noSickValue);
                }
            } else if (group === "LCWP") {
                // Create a formGroup to hold the group together
                formGroup = createCustomElement({
                    "type": "div",
                    "classesToAdd": ["form-group"]
                });

                // Create the label that will eventually describe the inputs
                formLabel = createCustomElement({
                    "type": "div",
                    "id": "lcwp-label",
                    "classesToAdd": ["form-label"],
                    "innerHTML": "Logistics Coordinator /  Wellness Person"
                });

                // Append the label to the group
                formGroup.appendChild(formLabel);

                // Check to see if there are any regular LCs or WPs
                if (workingWPs.length > 0 || workingLCs.length > 0) {
                    // Create regLCWP element
                    let regLCWPValue = createCustomElement({
                        "type": "div",
                        "id": "reg-lcwp-value",
                        "classesToAdd": ["form-control-plaintext"],
                        "innerHTML": createWorkingString("LCWP")
                    });

                    // Append the regLCWPValue to the formGroup
                    formGroup.appendChild(regLCWPValue);
                } else {
                    // There are no regular LCs or WPs working
                }

                // Assign appropriate Exceptions Container
                exceptionsContainer = exceptionsLCWPContainer;

                // Assign appropriate Sick Exceptions Container
                sickExceptionsContainer = sickExceptionsLCWPContainer;

                // Assign appropriate Info Array
                infoArray = exceptionLCWPsInfo;

                // Assign appropriate sick Info Array
                sickInfoArray = sickLCWPsInfo;

                // Go through each child node in exceptions container
                // Assign name, hours, and minutes
                // Will also check empty inputs and assign "is-invalid" if empty
                assignExceptionInfo(exceptionsContainer, infoArray, false);

                // You now have an array of objects for each person containing:
                // Their name, their hours, and their minutes
                // Create labels for each exception Team Leader
                createLabels(infoArray, formGroup, false);

                // Check if any LC or WP was sick
                if (lcwpIsSick === true) {
                    // Go through each child node in the sick exceptions container
                    // Assign name, hours, and minutes
                    // Will also check empty inputs and assign "is-invalid" if empty
                    // ? Do you need to check this for sick inputs?
                    assignExceptionInfo(sickExceptionsContainer, sickInfoArray, true);

                    // Create labels for the sick Team Leaders
                    createLabels(sickInfoArray, formGroup, true);
                } else {
                    // No LC or WP was sick
                    // Create custom element to let user know no LC or WP was sick
                    let noSickValue = createCustomElement({
                        "type": "div",
                        "id": "no-sick-lcwp",
                        "classesToAdd": ["form-control-plaintext"],
                        "innerHTML": "<em>No Logistics Coordinator or Wellness Person was sick on this day</em>."
                    });

                    // Append this info to formGroup
                    formGroup.appendChild(noSickValue);
                }
            } else if (group === "OC") {
                // Create a formGroup to hold the group together
                formGroup = createCustomElement({
                    "type": "div",
                    "classesToAdd": ["form-group"]
                });

                // Create the label that will eventually describe the inputs
                formLabel = createCustomElement({
                    "type": "div",
                    "id": "oc-label",
                    "classesToAdd": ["form-label"],
                    "innerHTML": "Office Coordinator"
                });

                // Append the label to the group
                formGroup.appendChild(formLabel);

                // Check to see if there are any regular TLs
                if (workingOCs.length > 0) {
                    // Create regOCValue element
                    let regOCValue = createCustomElement({
                        "type": "div",
                        "id": "reg-oc-value",
                        "classesToAdd": ["form-control-plaintext"],
                        "innerHTML": createWorkingString("OC")
                    });

                    // Append the regOCValue to the formGroup
                    formGroup.appendChild(regOCValue);
                } else {
                    // There are no regular OCs workings
                }

                // Assign appropriate Exceptions Container
                exceptionsContainer = exceptionsOCContainer;

                // Assign appropriate Sick Exceptions Container
                sickExceptionsContainer = sickExceptionsOCContainer;

                // Assign appropriate Info Array
                infoArray = exceptionOCsInfo;

                // Assign appropriate sick Info Array
                sickInfoArray = sickOCsInfo;

                // Go through each child node in exceptions container
                // Assign name, hours, and minutes
                // Will also check empty inputs and assign "is-invalid" if empty
                assignExceptionInfo(exceptionsContainer, infoArray, false);

                // You now have an array of objects for each person containing:
                // Their name, their hours, and their minutes
                // Create labels for each exception Team Leader
                createLabels(infoArray, formGroup, false);

                // Check if any OC was sick
                if (ocIsSick === true) {
                    // Go through each child node in the sick exceptions container
                    // Assign name, hours, and minutes
                    // Will also check empty inputs and assign "is-invalid" if empty
                    // ? Do you need to check this for sick inputs?
                    assignExceptionInfo(sickExceptionsContainer, sickInfoArray, true);

                    // Create labels for the sick Office Coordinator
                    createLabels(sickInfoArray, formGroup, true);
                } else {
                    // No Office Coordinator as sick
                    // Create custom element to let user know no OC was sick
                    let noSickValue = createCustomElement({
                        "type": "div",
                        "id": "no-sick-oc",
                        "classesToAdd": ["form-control-plaintext"],
                        "innerHTML": "<em>No Office Coordinator was sick on this day</em>."
                    });

                    // Append this info to formGroup
                    formGroup.appendChild(noSickValue);
                }
            }
        });

        // ! This is where you left off before your trip
        // * You finished writing the groups loop on createColumnElements
        // ! BUT, you have not tested anything yet. This file is getting huge.
    }

    function createCustomElement(options) {
        // This will be the element that will eventually be returned.
        // Create it in the Document with the passed "type" option
        let customElement = document.createElement(options.type);

        // Assign ID
        customElement.id = options.id;

        // Add classes one at a time from "classesToAdd"
        // ? There may be some way to just pass in the array instead of going through a loop
        options.classesToAdd.forEach(function (customClass) {
            customElement.classList.add(customClass);
        });

        // Check if the function should create some innerHTML
        if (options.innerHTML !== undefined) {
            customElement.innerHTML = options.innerHTML;
        }

        // Return the custom element
        return customElement;
    }

    function createWorkingString(positionType) {
        // Array holder for either workingTLs, workingLCWPs, workingOCs
        let positionArray = [];
        // Optional arry for LCWP
        let positionArray2 = [];

        // To hold the correct hours based on positionType
        let hoursType = "";

        // Assign positionArray based on positionType
        if (positionType === "TL") {
            positionArray = workingTLs;
            hoursType = hoursWorkedTL.value;
        } else if (positionType === "LCWP") {
            positionArray = workingLCs;
            positionArray2 = workingWPs;
            hoursType = hoursWorkedLCWP.value;
        } else {
            positionArray = workingOCs;
            hoursType = hoursWorkedOC.value;
        }

        // This part gets weird for LCWPs
        if (positionType !== "LCWP") {
            // Add ", " to each item in array
            let joinedString = positionArray.join(", ");

            // Add some HTML to make a final string
            let finalString = "<strong>" + joinedString.concat("</strong> worked a total of <strong>", hoursType, "</strong> hours.");

            // Return finalString
            return finalString;
        } else {
            // If the positionType === LCWP
            // There will be 2 joined strings
            // Add ", " to each item in both arrays
            let joinedString = positionArray.join(", ");
            let joinedString2 = positionArray2.join(", ");

            // Custom combined string
            let combinedString = "";

            // If there are either no regular WPs or regular LCs
            if (positionArray.length === 0 || positionArray2.length === 0) {
                // Combined string is both of the strings together
                combinedString = joinedString.concat(joinedString2);
            } else {
                // Combined string is joined with " and "
                combinedString = joinedString.concat(" and ", joinedString2);
            }

            // Add some HTML to make a final string
            let finalString = "<strong>" + combinedString.concat("</strong> worked a total of <strong>", hoursType, "</strong> hours.");

            // Return finalString
            return finalString;
        }
    }

    function assignExceptionInfo(container, infoArray, isSickInfo) {
        // Go through each child node of the container
        container.childNodes.forEach(function (nodeBig) {
            // If the child node is an input group
            if (nodeBig.classList.contains("input-group")) {
                let exceptionHours = "";
                let exceptionMinutes = "";
                let exceptionName = nodeBig.name;

                // Go through the div's child nodes
                nodeBig.childNodes.forEach(function (nodeSmall) {
                    // If the child is a form control
                    if (nodeSmall.classList.contains("form-control")) {
                        if (isSickInfo === false) {
                            // If this node is the hours input or minutes input
                            if (nodeSmall.max === "24") {
                                exceptionHours = nodeSmall.value;
                            } else if (nodeSmall.max === "45") {
                                exceptionMinutes = nodeSmall.value;
                            }
                        } else {
                            // If this node is the hours input or minutes input
                            if (nodeSmall.max === "8") {
                                exceptionHours = nodeSmall.value;
                            } else if (nodeSmall.max === "45") {
                                exceptionMinutes = nodeSmall.value;
                            }
                        }
                    }
                });

                // Go through the container and if an input is empty
                // Add the "is-invalid" class
                checkEmptyInputs(container);

                // If the function was called with the desire to look at regular or sick data
                if (isSickInfo === false) {
                    // Push object to info array
                    infoArray.push({
                        name: exceptionName,
                        hours: exceptionHours,
                        minutes: exceptionMinutes
                    });
                } else {
                    // Push object to sick info array
                    sickInfoArray.push({
                        name: exceptionName,
                        hours: exceptionHours,
                        minutes: exceptionMinutes
                    });
                }
            }
        });
    }

    function checkEmptyInputs(container) {
        // Goes through all nodes in container
        container.childNodes.forEach(function (nodeBig) {
            // Go through these form nodes
            nodeBig.childNodes.forEach(function (nodeSmall) {
                // If the child is a form control
                if (nodeSmall.classList.contains("form-control")) {
                    // If this node is the hours input or minutes input
                    if (nodeSmall.max === "24" || nodeSmall.max === "45") {
                        // Check if Hours Input is empty
                        if (nodeSmall.value === "") {
                            // Assign invalid class
                            nodeSmall.classList.add("is-invalid");
                        } else {
                            // Remove the invalid class for inputs that are not empty
                            // ? Might need to check if the class is in the class list first
                            // * expecting to run into issue with not able to remove class that isn't there
                            nodeSmall.classList.remove("is-invalid");
                        }
                    }
                }
            });
        });
    }

    function createLabels(infoArray, formGroup, isSickInfo) {
        // Go through each person in the info array
        infoArray.forEach(function (person) {
            // Create a string that will become the exceptionValue's ID
            // Replace the space in the name with a hyphen
            // ex. "Alex Lee" becomes "Alex-Lee"
            let stringID = `${person.name}`.replace(" ", "-");

            // Empty exception value
            // isSickInfo will determine how this label is created
            let exceptionValue = "";

            // Check to see if this label is for the array of sick people or not
            if (isSickInfo === false) {
                // Create a custom element with that stringID
                exceptionValue = createCustomElement({
                    "type": "div",
                    "id": `exception-value-${stringID}`,
                    "classesToAdd": ["form-control-plaintext"],
                    "innerHTML": "<strong" + person.name + "</strong> worked for <strong>" + person.hours + "</strong> hours and <strong>" + person.minutes + "</strong> minutes."
                });
            } else {
                // Create a custom element with that stringID
                exceptionValue = createCustomElement({
                    "type": "div",
                    "id": `sick-value-${stringID}`,
                    "classesToAdd": ["form-control-plaintext"],
                    "innerHTML": "<strong>" + person.name + "</strong> was sick for <strong>" + person.hours + "</strong> hours and <strong>" + person.minutes + "</strong> minutes."
                });
            }

            // Append the label to the formGroup
            formGroup.appendChild(exceptionValue);
        });
    }


    // * First, go through and check if there are empty inputs
    // Go through the container and if an input is empty
    // Add the "is-invalid" class
    checkEmptyInputs(container);


    // * 1. Validation
    if (validInput() === true) {
        // If the info is valid, make sure that there are no "is-invalid" red boxes left
        let listOfItemsToMakeGood = document.querySelectorAll(".is-invalid");

        listOfItemsToMakeGood.forEach(function (itemToMakeGood) {
            itemToMakeGood.classList.remove("is-invalid");
        });

        // * 2. Build Preview Card
        // Build preview card
        buildPreviewCard(document);
        // ? Possibly the need to clear some type of data coming in before writing.

        // * 3. Append Info to Preview Card
        fillStaffArrays(checkbox);


        // ! Refactoring as of 7:00 PM
        // * Going to make into "createColumnElements" function
        createColumnElements();
    } else {
        // If the info is not valid, show the modal to tell user to fix it
        let firstInvalidElement = document.querySelector(".is-invalid");
        firstInvalidElement.scrollIntoView({
            behavior: "smooth"
        });
        setTimeout(showInvalidModal, 500);
    }


    // ? START OF SHIT THINGS? 

    function showInvalidModal() {
        $('#invalid-input-modal').modal();
    }

    function slideOutItems() {
        alert.classList.add("animated", "slideOutLeft");
        siteInfoCard.classList.add("animated", "slideOutLeft");
        allPositionCards.forEach(function (card) {
            card.classList.add("animated", "slideOutLeft");
        });
        setTimeout(buildPreviewCard, 750);
    }

    function buildPreviewCard() {
        hideThis(siteInfoCard);
        allPositionCards.forEach(function (card) {
            hideThis(card);
        });

        previewCardDiv.appendChild(headerDiv);
        headerDiv.appendChild(header);
        previewCardDiv.appendChild(body);
        body.appendChild(infoRow);
        body.appendChild(positionsRow);
        addFinalButtons(previewCardDiv);

        alert.classList.remove("slideOutLeft");
        alert.classList.add("animated", "slideInRight");

        alert.classList.add("alert-icon");
        alert.role = "alert";
        alert.innerHTML = "";
        let alertIcon = document.createElement("i");
        alertIcon.classList.add("fas", "fa-exclamation-triangle");
        alert.appendChild(alertIcon);
        span1.innerHTML = "Please look through the following information, and verify that it is correct.";
        alert.appendChild(span1);

        mainForm.prepend(previewCardDiv);
    }


}

function validInput() {
    if (arguments.length > 0) {
        if (this.value === "") {
            if (this.classList.contains("is-invalid")) {

            } else {
                this.classList.add("is-invalid");
            }
            return false;
        } else {
            if (this.classList.contains("is-invalid")) {
                this.classList.remove("is-invalid");
            }
            return true;
        }
    } else {
        let inputsToCheck = document.querySelectorAll(".verify-this");

        let emptyCount = 0;

        inputsToCheck.forEach(function (input) {
            if (input.value === "") {
                emptyCount++;
            }
        });

        if (emptyCount > 0) {
            return false;
        } else {
            return true;
        }
    }
}



















// FORM

const scriptURL = 'https://script.google.com/macros/s/AKfycbyaZdP8ZLdRG-8EqKqO5ceqeaWJEH2y3HDJFjV5LlFv4V6_FkQ/exec';
const form = document.forms['submit-to-google-sheet'];
const loading = document.querySelector('.loading-form');
const successMessage = document.querySelector('.js-success-message');
const errorMessage = document.querySelector('.js-error-message');
const againButton = document.querySelector('.again-button');
const formBody = new FormData();


function createData() {
    // Names
    formBody.append('firstName', firstName.value);
    formBody.append('lastName', lastName.value);

    // Date
    formBody.append('month', dateMonth.value);
    formBody.append('day', dateDay.value);

    // Site
    formBody.append('site', chosenSite);

    // Camp
    formBody.append('camp', currentCamp);

    JSON.stringify(workingTLs);
    JSON.stringify(exceptionTLs);
    formBody.append('workingTLs (Reg)', workingTLs);
    formBody.append('exceptionTLs', exceptionTLs);

    // Go through the exceptions container - Team Leaders
    exceptionsTLContainer.childNodes.forEach(function (nodeBig) {
        // If the child node is an input group 
        if (nodeBig.classList.contains("input-group")) {
            let execptionHoursTL = "";
            let exceptionMinutesTL = "";
            let exceptionNameTL = nodeBig.name;
            // Go through the div's child nodes
            nodeBig.childNodes.forEach(function (nodeSmall) {
                // If the child is a form control
                if (nodeSmall.classList.contains("form-control")) {
                    if (nodeSmall.max === "24") {
                        execptionHoursTL = nodeSmall.value;
                    } else if (nodeSmall.max === "45") {
                        exceptionMinutesTL = nodeSmall.value;
                    }
                }
            });
            /* Possible reason for doubles
            // Push object to info array
            exceptionTLsInfo.push({
                name: exceptionNameTL,
                hours: execptionHoursTL,
                minutes: exceptionMinutesTL
            });
            */
        }
    });
    var unparsedExceptionTLsInfo = Papa.unparse(exceptionTLsInfo);
    formBody.append('exceptionTLsInfo', unparsedExceptionTLsInfo);

    // Go through the exceptions container - LCWP
    exceptionsLCWPContainer.childNodes.forEach(function (nodeBig) {
        // If the child node is an input group 
        if (nodeBig.classList.contains("input-group")) {
            let execptionHoursLCWP = "";
            let exceptionMinutesLCWP = "";
            let exceptionNameLCWP = nodeBig.name;
            // Go through the div's child nodes
            nodeBig.childNodes.forEach(function (nodeSmall) {
                // If the child is a form control
                if (nodeSmall.classList.contains("form-control")) {
                    if (nodeSmall.max === "24") {
                        execptionHoursLCWP = nodeSmall.value;
                    } else if (nodeSmall.max === "45") {
                        exceptionMinutesLCWP = nodeSmall.value;
                    }
                }
            });
            /* Possible reason for doubles
            // Push object to info array
            exceptionLCWPsInfo.push({
                name: exceptionNameLCWP,
                hours: execptionHoursLCWP,
                minutes: exceptionMinutesLCWP
            });
            */
        }
    });
    var unparsedExceptionLCWPsInfo = Papa.unparse(exceptionLCWPsInfo);
    formBody.append('exceptionLCWPsInfo', unparsedExceptionLCWPsInfo);

    // Go through the exceptions container - Office Coordinators
    exceptionsOCContainer.childNodes.forEach(function (nodeBig) {
        // If the child node is an input group 
        if (nodeBig.classList.contains("input-group")) {
            let execptionHoursOC = "";
            let exceptionMinutesOC = "";
            let exceptionNameOC = nodeBig.name;
            // Go through the div's child nodes
            nodeBig.childNodes.forEach(function (nodeSmall) {
                // If the child is a form control
                if (nodeSmall.classList.contains("form-control")) {
                    if (nodeSmall.max === "24") {
                        execptionHoursOC = nodeSmall.value;
                    } else if (nodeSmall.max === "45") {
                        exceptionMinutesOC = nodeSmall.value;
                    }
                }
            });
            /* Possible reason for doubles
            // Push object to info array
            exceptionOCsInfo.push({
                name: exceptionNameOC,
                hours: execptionHoursOC,
                minutes: exceptionMinutesOC
            });
            */
        }
    });
    var unparsedExceptionOCsInfo = Papa.unparse(exceptionOCsInfo);
    formBody.append('exceptionOCsInfo', unparsedExceptionOCsInfo);




    /* Possibly reason for double inputs
    // Non-Sick Logistics Coordinators
    lcCheckboxes.forEach(function (checkbox) {
        if (checkbox.checked === true) {
            workingLCs.push(checkbox.name);
        } else {
            exceptionLCs.push(checkbox.name);
        }
    });
    */
    JSON.stringify(workingLCs);
    JSON.stringify(exceptionLCs);
    formBody.append('workingLCs (Reg)', workingLCs);
    formBody.append('exceptionLCs', exceptionLCs);

    /* Possibly reason for double inputs
    // Non-Sick Wellness Person
    wpCheckboxes.forEach(function (checkbox) {
        if (checkbox.checked === true) {
            workingWPs.push(checkbox.name);
        } else {
            exceptionWPs.push(checkbox.name);
        }
    });
    */
    JSON.stringify(workingWPs);
    JSON.stringify(exceptionWPs);
    formBody.append('workingWPs (Reg)', workingWPs);
    formBody.append('exceptionWPs', exceptionWPs);

    /* Possibly reason for double inputs
    // Non-Sick Office Coordinators
    ocCheckboxes.forEach(function (checkbox) {
        if (checkbox.checked === true) {
            workingOCs.push(checkbox.name);
        } else {
            exceptionOCs.push(checkbox.name);
        }
    });
    */
    JSON.stringify(workingOCs);
    JSON.stringify(exceptionOCs);
    formBody.append('workingOCs (Reg)', workingOCs);
    formBody.append('exceptionOCs', exceptionOCs);

    // Regular working hours by position
    formBody.append('hoursTLReg', hoursWorkedTL.value);
    formBody.append('hoursLCWPReg', hoursWorkedLCWP.value);
    formBody.append('hoursOCReg', hoursWorkedOC.value);

    // Sick Team Leaders
    formBody.append('tlIsSick', tlIsSick);
    sickTLCheckboxes.forEach(function (checkbox) {
        if (checkbox.checked === true) {
            sickTLs.push(checkbox.name);
        }
    });
    JSON.stringify(sickTLs);
    formBody.append('sickTLs', sickTLs);

    // Sick Logistics Coordinators & Wellness Person
    formBody.append('lcwpIsSick', lcwpIsSick);
    sickLCWPCheckboxes.forEach(function (checkbox) {
        if (checkbox.checked === true) {
            sickLCWPs.push(checkbox.name);
        }
    });
    JSON.stringify(sickLCWPs);
    formBody.append('sickLCWPs', sickLCWPs);

    // Sick Office Coordinators
    formBody.append('ocIsSick', ocIsSick);
    sickOCCheckboxes.forEach(function (checkbox) {
        if (checkbox.checked === true) {
            sickOCs.push(checkbox.name);
        }
    });
    JSON.stringify(sickOCs);
    formBody.append('sickOCs', sickOCs);

    // Go through the sick exceptions container - Team Leaders
    sickExceptionsTLContainer.childNodes.forEach(function (nodeBig) {
        // If the child node is an input group 
        if (nodeBig.classList.contains("input-group")) {
            let sickHoursTL = "";
            let sickMinutesTL = "";
            let sickNameTL = nodeBig.name;
            // Go through the div's child nodes
            nodeBig.childNodes.forEach(function (nodeSmall) {
                // If the child is a form control
                if (nodeSmall.classList.contains("form-control")) {
                    if (nodeSmall.max === "8") {
                        sickHoursTL = nodeSmall.value;
                    } else if (nodeSmall.max === "45") {
                        sickMinutesTL = nodeSmall.value;
                    }
                }
            });
            // Push object to info array
            // ! This is where you are getting double sick TLs
            /*
            sickTLsInfo.push({
                name: sickNameTL,
                hours: sickHoursTL,
                minutes: sickMinutesTL
            });
            */
        }
    });
    console.log("sickTLsInfo before PapaParse:");
    console.log(sickTLsInfo);
    var unparsedSickTLsInfo = Papa.unparse(sickTLsInfo);
    formBody.append('sickTLsInfo', unparsedSickTLsInfo);
    console.log("sickTLsInfo after PapaParse:");
    console.log(unparsedSickTLsInfo);

    // Go through the sick exceptions container - LCWPs
    sickExceptionsLCWPContainer.childNodes.forEach(function (nodeBig) {
        // If the child node is an input group 
        if (nodeBig.classList.contains("input-group")) {
            let sickHoursLCWP = "";
            let sickMinutesLCWP = "";
            let sickNameLCWP = nodeBig.name;
            // Go through the div's child nodes
            nodeBig.childNodes.forEach(function (nodeSmall) {
                // If the child is a form control
                if (nodeSmall.classList.contains("form-control")) {
                    if (nodeSmall.max === "8") {
                        sickHoursLCWP = nodeSmall.value;
                    } else if (nodeSmall.max === "45") {
                        sickMinutesLCWP = nodeSmall.value;
                    }
                }
            });
            // ! This is where you are getting double sick LCWPs
            // Push object to info array
            /*
            sickLCWPsInfo.push({
                name: sickNameLCWP,
                hours: sickHoursLCWP,
                minutes: sickMinutesLCWP
            });
            */
        }
    });
    var unparsedSickLCWPsInfo = Papa.unparse(sickLCWPsInfo);
    formBody.append('sickLCWPsInfo', unparsedSickLCWPsInfo);

    // Go through the sick exceptions container - Office Coordinators
    sickExceptionsOCContainer.childNodes.forEach(function (nodeBig) {
        // If the child node is an input group 
        if (nodeBig.classList.contains("input-group")) {
            let sickHoursOC = "";
            let sickMinutesOC = "";
            let sickNameOC = nodeBig.name;
            // Go through the div's child nodes
            nodeBig.childNodes.forEach(function (nodeSmall) {
                // If the child is a form control
                if (nodeSmall.classList.contains("form-control")) {
                    if (nodeSmall.max === "8") {
                        sickHoursOC = nodeSmall.value;
                    } else if (nodeSmall.max === "45") {
                        sickMinutesOC = nodeSmall.value;
                    }
                }
            });
            // ! This is where you are getting double sick OCsInfo
            // Push object to info array
            /*
            sickOCsInfo.push({
                name: sickNameOC,
                hours: sickHoursOC,
                minutes: sickMinutesOC
            });
            */
        }
    });
    var unparsedSickOCsInfo = Papa.unparse(sickOCsInfo);
    formBody.append('sickOCsInfo', unparsedSickOCsInfo);
}


form.addEventListener('submit', e => {
    e.preventDefault();
    hideThis(alert);
    showLoadingIndicator();
    createData();
    fetch(scriptURL, {
            method: 'POST',
            body: formBody
        })
        .then(response => showSuccessMessage(response))
        .catch(error => showErrorMessage(error));
});

function showLoadingIndicator() {
    form.classList.add('is-hidden-form');
    loading.classList.remove('is-hidden-form');
}

function showSuccessMessage(response) {
    console.log('Success!', response);
    setTimeout(() => {
        successMessage.classList.remove('is-hidden-form');
        loading.classList.add('is-hidden-form');
        againButton.classList.remove('is-hidden-form');
    }, 500);
}

function showErrorMessage(error) {
    console.error('Error!', error.message);
    setTimeout(() => {
        errorMessage.classList.remove('is-hidden-form');
        loading.classList.add('is-hidden-form');
    }, 500);
}

function showInvalidModal() {
    $('#invalid-input-modal').modal();
}