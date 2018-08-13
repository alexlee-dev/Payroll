/// <reference types="Cypress" />


Cypress.Commands.add("fillSiteInfoBecca", (site, camp, month, day) => {
    cy.visit('/index.html');
    cy.get('#firstName').type("Leslie", {force: true});
    cy.get('#lastName').type("Braff", {force: true});
    cy.get(`#${site}`).check({
        force: true
    });
    cy.get(`#${camp}`).check({
        force: true
    });
    cy.get('#date-month').select(month, {force: true});
    cy.get('#date-day').select(day, {force: true});
    cy.get('#site-info-continue-button').click({force: true});
});

context("Generate Villanova Data", function () {
    var tlsToUncheck = [];
    var tlExceptionHourInputs = [];
    var tlExceptionMinuteInputs = [];
    var tlExceptionHourValues = [];
    var tlExceptionMinuteValues = [];
    var lcwpsToUncheck = [];
    var lcwpExceptionHourInputs = [];
    var lcwpExceptionMinuteInputs = [];
    var lcwpExceptionHourValues = [];
    var lcwpExceptionMinuteValues = [];
    var ocsToUncheck = [];
    var ocExceptionHourInputs = [];
    var ocExceptionMinuteInputs = [];
    var ocExceptionHourValues = [];
    var ocExceptionMinuteValues = [];

    function addStaff(fullName, positionType, hourValue, minuteValue) {
        var uncheckArray = "";
        var hourInputArray = "";
        var minuteInputArray = "";
        var hourValueArray = "";
        var minuteValueArray = "";
        if (positionType === "TL" || positionType === "PHOTO") {
            uncheckArray = tlsToUncheck;
            hourInputArray = tlExceptionHourInputs;
            minuteInputArray = tlExceptionMinuteInputs;
            hourValueArray = tlExceptionHourValues;
            minuteValueArray = tlExceptionMinuteValues;
        } else if (positionType === "OC") {
            uncheckArray = ocsToUncheck;
            hourInputArray = ocExceptionHourInputs;
            minuteInputArray = ocExceptionMinuteInputs;
            hourValueArray = ocExceptionHourValues;
            minuteValueArray = ocExceptionMinuteValues;
        } else if (positionType === "LCWP") {
            uncheckArray = lcwpsToUncheck;
            hourInputArray = lcwpExceptionHourInputs;
            minuteInputArray = lcwpExceptionMinuteInputs;
            hourValueArray = lcwpExceptionHourValues;
            minuteValueArray = lcwpExceptionMinuteValues;
        }

        var nameArray = fullName.split(" ");
        var firstName = nameArray[0];
        var firstNameLower = firstName.toLowerCase();
        var lastName = nameArray[1];
        var lastNameLower = lastName.toLowerCase();
        var smushedName = firstName.concat(lastName);

        uncheckArray.push(`#${firstNameLower}-${lastNameLower}`);
        hourInputArray.push(`#exception-hours-${smushedName}`);
        minuteInputArray.push(`#exception-minutes-${smushedName}`);
        hourValueArray.push(hourValue.toString());
        minuteValueArray.push(minuteValue.toString());
    }

    function uncheckStaff() {
        tlsToUncheck.forEach(function (tlCheckbox) {
            cy.get(tlCheckbox).uncheck({
                force: true
            });
        });
        lcwpsToUncheck.forEach(function (lcwpCheckbox) {
            cy.get(lcwpCheckbox).uncheck({
                force: true
            });
        });
        ocsToUncheck.forEach(function (ocCheckbox) {
            cy.get(ocCheckbox).uncheck({
                force: true
            });
        });
    }

    function writeStaffValues() {
        tlExceptionHourInputs.forEach(function (hourInput) {
            var thisIndex = tlExceptionHourInputs.indexOf(hourInput);
            var valueToWrite = tlExceptionHourValues[thisIndex];
            cy.get(hourInput).type(valueToWrite);
        });
        tlExceptionMinuteInputs.forEach(function (minuteInput) {
            var thisIndex = tlExceptionMinuteInputs.indexOf(minuteInput);
            var valueToWrite = tlExceptionMinuteValues[thisIndex];
            cy.get(minuteInput).type(valueToWrite);
        });
        lcwpExceptionHourInputs.forEach(function (hourInput) {
            var thisIndex = lcwpExceptionHourInputs.indexOf(hourInput);
            var valueToWrite = lcwpExceptionHourValues[thisIndex];
            cy.get(hourInput).type(valueToWrite);
        });
        lcwpExceptionMinuteInputs.forEach(function (minuteInput) {
            var thisIndex = lcwpExceptionMinuteInputs.indexOf(minuteInput);
            var valueToWrite = lcwpExceptionMinuteValues[thisIndex];
            cy.get(minuteInput).type(valueToWrite);
        });
        ocExceptionHourInputs.forEach(function (hourInput) {
            var thisIndex = ocExceptionHourInputs.indexOf(hourInput);
            var valueToWrite = ocExceptionHourValues[thisIndex];
            cy.get(hourInput).type(valueToWrite);
        });
        ocExceptionMinuteInputs.forEach(function (minuteInput) {
            var thisIndex = ocExceptionMinuteInputs.indexOf(minuteInput);
            var valueToWrite = ocExceptionMinuteValues[thisIndex];
            cy.get(minuteInput).type(valueToWrite);
        });
    }

    function logDay(month, day) {
        var dateObject = {
            tlsToUncheck: tlsToUncheck,
            tlExceptionHourInputs: tlExceptionHourInputs,
            tlExceptionMinuteInputs: tlExceptionMinuteInputs,
            tlExceptionHourValues: tlExceptionHourValues,
            tlExceptionMinuteValues: tlExceptionMinuteValues,
            lcwpsToUncheck: lcwpsToUncheck,
            lcwpExceptionHourInputs: lcwpExceptionHourInputs,
            lcwpExceptionMinuteInputs: lcwpExceptionMinuteInputs,
            lcwpExceptionHourValues: lcwpExceptionHourValues,
            lcwpExceptionMinuteValues: lcwpExceptionMinuteValues,
            ocsToUncheck: ocsToUncheck,
            ocExceptionHourInputs: ocExceptionHourInputs,
            ocExceptionMinuteInputs: ocExceptionMinuteInputs,
            ocExceptionHourValues: ocExceptionHourValues,
            ocExceptionMinuteValues: ocExceptionMinuteValues,
            month: month,
            day: day
        };

        console.log(dateObject);
    }

    function clearArrays() {
        tlsToUncheck = [];
        tlExceptionHourInputs = [];
        tlExceptionMinuteInputs = [];
        tlExceptionHourValues = [];
        tlExceptionMinuteValues = [];
        lcwpsToUncheck = [];
        lcwpExceptionHourInputs = [];
        lcwpExceptionMinuteInputs = [];
        lcwpExceptionHourValues = [];
        lcwpExceptionMinuteValues = [];
        ocsToUncheck = [];
        ocExceptionHourInputs = [];
        ocExceptionMinuteInputs = [];
        ocExceptionHourValues = [];
        ocExceptionMinuteValues = [];
    }

    context("Villanova University", function () {
        context("Camp 1", function () {
            it('July 3 (Day -6)', function () {
                cy.fillSiteInfoBecca('site-villa', 'villa-camp1', '7', '3');
                
                uncheckStaff();
                writeStaffValues();
                
                cy.get('#preview-button').click();
                cy.get('#send-data-button').click();
                cy.wait(5000);
                cy.contains('Success');
                
                logDay(7, 3);
                clearArrays();
            });
            it('July 4 (Day -5)', function () {
                cy.fillSiteInfoBecca('site-villa', 'villa-camp1', '7', '4');
                
                addStaff('Leslie Braff', 'LCWP', 11, 0);

                uncheckStaff();
                writeStaffValues();
                
                cy.get('#preview-button').click();
                cy.get('#send-data-button').click();
                cy.wait(5000);
                cy.contains('Success');
                
                logDay(7, 4);
                clearArrays();
            });
            it('July 5 (Day -4)', function () {
                cy.fillSiteInfoBecca('site-villa', 'villa-camp1', '7', '5');
                
                addStaff('Kelly Castleberry', 'TL', 14, 0);
                addStaff('Adam Chan', 'TL', 14, 0);
                addStaff('Trace Craver', 'TL', 8, 30);
                addStaff('Rachel Dillman', 'TL', 14, 0);
                addStaff('Katrina Hoefflinger', 'TL', 15, 0);
                addStaff('James Levenson', 'TL', 14, 0);
                addStaff('Michael Pineda-O\\\'Donnell', 'TL', 14, 0);
                addStaff('Viva Sandoval', 'TL', 14, 0);
                addStaff('Isabella Stenz', 'TL', 14, 0);
                addStaff('Deja Washington', 'TL', 14, 0);
                addStaff('Yolanda Drew', 'TL', 0, 0);
                addStaff('Kayla Miller', 'TL', 0, 0);
                addStaff('Joe DeBarr', 'TL', 0, 0);
                addStaff('Leslie Braff', 'LCWP', 13, 0);
                addStaff('Jordan Wesson', 'LCWP', 15, 0);
                
                uncheckStaff();
                writeStaffValues();
                
                cy.get('#preview-button').click();
                cy.get('#send-data-button').click();
                cy.wait(5000);
                cy.contains('Success');
                
                logDay(7, 5);
                clearArrays();
            });
            it('July 6 (Day -3)', function () {
                cy.fillSiteInfoBecca('site-villa', 'villa-camp1', '7', '6');
                
                addStaff('Yolanda Drew', 'TL', 0, 0);
                addStaff('Kayla Miller', 'TL', 0, 0);
                addStaff('Joe DeBarr', 'TL', 0, 0);
                addStaff('Leslie Braff', 'LCWP', 13, 0);
                addStaff('Jordan Wesson', 'LCWP', 15, 0);

                uncheckStaff();
                writeStaffValues();
                
                cy.get('#preview-button').click();
                cy.get('#send-data-button').click();
                cy.wait(5000);
                cy.contains('Success');
                
                logDay(7, 6);
                clearArrays();
            });
            it('July 7 (Day -2)', function () {
                cy.fillSiteInfoBecca('site-villa', 'villa-camp1', '7', '7');
                
                addStaff('Yolanda Drew', 'TL', 0, 0);
                addStaff('Kayla Miller', 'TL', 0, 0);
                addStaff('Joe DeBarr', 'TL', 0, 0);
                
                uncheckStaff();
                writeStaffValues();
                
                cy.get('#preview-button').click();
                cy.get('#send-data-button').click();
                cy.wait(5000);
                cy.contains('Success');
                
                logDay(7, 7);
                clearArrays();
            });
            it('July 8 (Day -1)', function () {
                cy.fillSiteInfoBecca('site-villa', 'villa-camp1', '7', '8');
                
                addStaff('Yolanda Drew', 'TL', 0, 0);
                addStaff('Kayla Miller', 'TL', 0, 0);
                addStaff('Joe DeBarr', 'TL', 0, 0);
                addStaff('Leslie Braff', 'LCWP', 12, 0);
                addStaff('Jordan Wesson', 'LCWP', 12, 0);
                
                uncheckStaff();
                writeStaffValues();
                
                cy.get('#preview-button').click();
                cy.get('#send-data-button').click();
                cy.wait(5000);
                cy.contains('Success');
                
                logDay(7, 8);
                clearArrays();
            });
            it('July 9 (Day 1)', function () {
                cy.fillSiteInfoBecca('site-villa', 'villa-camp1', '7', '9');
                
                addStaff('Kelly Castleberry', 'TL', 14, 0);
                addStaff('Adam Chan', 'TL', 14, 0);
                addStaff('Trace Craver', 'TL', 15, 0);
                addStaff('Rachel Dillman', 'TL', 15, 0);
                addStaff('Katrina Hoefflinger', 'TL', 14, 0);
                addStaff('James Levenson', 'TL', 14, 0);
                addStaff('Michael Pineda-O\\\'Donnell', 'TL', 16, 0);
                addStaff('Viva Sandoval', 'TL', 14, 0);
                addStaff('Deja Washington', 'TL', 14, 0);
                addStaff('Yolanda Drew', 'TL', 14, 0);
                addStaff('Kayla Miller', 'TL', 14, 0);
                addStaff('Joe DeBarr', 'TL', 14, 0);
                addStaff('Leslie Braff', 'LCWP', 14, 0);
                addStaff('Jordan Wesson', 'LCWP', 16, 30);
                

                uncheckStaff();
                writeStaffValues();
                
                cy.get('#preview-button').click();
                cy.get('#send-data-button').click();
                cy.wait(5000);
                cy.contains('Success');
                
                logDay(7, 9);
                clearArrays();
            });
            it('July 10 (Day 2)', function () {
                cy.fillSiteInfoBecca('site-villa', 'villa-camp1', '7', '10');
                
                addStaff('Rachel Dillman', 'TL', 11, 30);
                addStaff('Katrina Hoefflinger', 'TL', 11, 30);
                addStaff('Michael Pineda-O\\\'Donnell', 'TL', 12, 0);
                addStaff('Yolanda Drew', 'TL', 15, 30);
                addStaff('Kayla Miller', 'TL', 14, 0);
                addStaff('Leslie Braff', 'LCWP', 14, 30);
                addStaff('Jordan Wesson', 'LCWP', 12, 15);
                
                uncheckStaff();
                writeStaffValues();
                
                cy.get('#preview-button').click();
                cy.get('#send-data-button').click();
                cy.wait(5000);
                cy.contains('Success');
                
                logDay(7, 10);
                clearArrays();
            });
            it('July 11 (Day 3)', function () {
                cy.fillSiteInfoBecca('site-villa', 'villa-camp1', '7', '11');
                
                addStaff('Rachel Dillman', 'TL', 12, 0);
                addStaff('Michael Pineda-O\\\'Donnell', 'TL', 12, 0);
                addStaff('Viva Sandoval', 'TL', 13, 0);
                addStaff('Deja Washington', 'TL', 12, 0);
                addStaff('Yolanda Drew', 'TL', 16, 30);
                addStaff('Kayla Miller', 'TL', 14, 0);
                
                uncheckStaff();
                writeStaffValues();
                
                cy.get('#preview-button').click();
                cy.get('#send-data-button').click();
                cy.wait(5000);
                cy.contains('Success');
                
                logDay(7, 11);
                clearArrays();
            });
            it('July 12 (Day 4)', function () {
                cy.fillSiteInfoBecca('site-villa', 'villa-camp1', '7', '12');
                
                addStaff('Rachel Dillman', 'TL', 12, 0);
                addStaff('Viva Sandoval', 'TL', 12, 0);
                addStaff('Deja Washington', 'TL', 12, 0);
                addStaff('Yolanda Drew', 'TL', 17, 30);
                addStaff('Kayla Miller', 'TL', 11, 30);
                
                uncheckStaff();
                writeStaffValues();
                
                cy.get('#preview-button').click();
                cy.get('#send-data-button').click();
                cy.wait(5000);
                cy.contains('Success');
                
                logDay(7, 12);
                clearArrays();
            });
            it('July 13 (Day 5)', function () {
                cy.fillSiteInfoBecca('site-villa', 'villa-camp1', '7', '13');
                
                addStaff('James Levenson', 'TL', 11, 30);
                addStaff('Yolanda Drew', 'TL', 16, 30);
                addStaff('Leslie Braff', 'LCWP', 0, 0);
                addStaff('Jordan Wesson', 'LCWP', 10, 0);
                
                uncheckStaff();
                writeStaffValues();
                
                cy.get('#preview-button').click();
                cy.get('#send-data-button').click();
                cy.wait(5000);
                cy.contains('Success');
                
                logDay(7, 13);
                clearArrays();
            });
            it('July 14 (Day 6)', function () {
                cy.fillSiteInfoBecca('site-villa', 'villa-camp1', '7', '14');
                
                addStaff('Deja Washington', 'TL', 15, 0);
                addStaff('Yolanda Drew', 'TL', 12, 0);
                addStaff('Kayla Miller', 'TL', 10, 0);
                addStaff('Leslie Braff', 'LCWP', 0, 0);
                addStaff('Jordan Wesson', 'LCWP', 0, 0);

                uncheckStaff();
                writeStaffValues();
                
                cy.get('#preview-button').click();
                cy.get('#send-data-button').click();
                cy.wait(5000);
                cy.contains('Success');
                
                logDay(7, 14);
                clearArrays();
            });
        });
        context("Camp 2", function () {
            it('July 15 (Day -2)', function () {
                cy.fillSiteInfoBecca('site-villa', 'villa-camp2', '7', '15');
                
                addStaff('Yolanda Drew', 'TL', 3, 0);
                uncheckStaff();
                writeStaffValues();
                
                cy.get('#preview-button').click();
                cy.get('#send-data-button').click();
                cy.wait(5000);
                cy.contains('Success');
                
                logDay(7, 15);
                clearArrays();
            });
            it('July 16 (Day -1)', function () {
                cy.fillSiteInfoBecca('site-villa', 'villa-camp2', '7', '16');
                
                addStaff('Yolanda Drew', 'TL', 4, 0);
                
                uncheckStaff();
                writeStaffValues();
                
                cy.get('#preview-button').click();
                cy.get('#send-data-button').click();
                cy.wait(5000);
                cy.contains('Success');
                
                logDay(7, 16);
                clearArrays();
            });
            it('July 17 (Day 1)', function () {
                cy.fillSiteInfoBecca('site-villa', 'villa-camp2', '7', '17');
                
                addStaff('Trace Craver', 'TL', 13, 15);
                addStaff('Katrina Hoefflinger', 'TL', 11, 30);
                addStaff('Isabella Stenz', 'LCWP', 12, 0);
                addStaff('Yolanda Drew', 'TL', 0, 0);
                
                uncheckStaff();
                writeStaffValues();
                
                cy.get('#preview-button').click();
                cy.get('#send-data-button').click();
                cy.wait(5000);
                cy.contains('Success');
                
                logDay(7, 17);
                clearArrays();
            });
            it('July 18 (Day 2)', function () {
                cy.fillSiteInfoBecca('site-villa', 'villa-camp2', '7', '18');
                
                addStaff('Trace Craver', 'TL', 15, 0);
                addStaff('Yolanda Drew', 'TL', 0, 0);
                
                uncheckStaff();
                writeStaffValues();
                
                cy.get('#preview-button').click();
                cy.get('#send-data-button').click();
                cy.wait(5000);
                cy.contains('Success');
                
                logDay(7, 18);
                clearArrays();
            });
            it('July 19 (Day 3)', function () {
                cy.fillSiteInfoBecca('site-villa', 'villa-camp2', '7', '19');
                
                addStaff('Trace Craver', 'TL', 13, 30);
                addStaff('Yolanda Drew', 'TL', 0, 0);
                
                uncheckStaff();
                writeStaffValues();
                
                cy.get('#preview-button').click();
                cy.get('#send-data-button').click();
                cy.wait(5000);
                cy.contains('Success');
                
                logDay(7, 19);
                clearArrays();
            });
            it('July 20 (Day 4)', function () {
                cy.fillSiteInfoBecca('site-villa', 'villa-camp2', '7', '20');
                
                addStaff('Trace Craver', 'TL', 13, 0);
                addStaff('Yolanda Drew', 'TL', 0, 0);
                
                uncheckStaff();
                writeStaffValues();
                
                cy.get('#preview-button').click();
                cy.get('#send-data-button').click();
                cy.wait(5000);
                cy.contains('Success');
                
                logDay(7, 20);
                clearArrays();
            });
            it('July 21 (Day 5)', function () {
                cy.fillSiteInfoBecca('site-villa', 'villa-camp2', '7', '21');
                
                addStaff('Trace Craver', 'TL', 13, 0);
                addStaff('Yolanda Drew', 'TL', 0, 0);
                
                uncheckStaff();
                writeStaffValues();
                
                cy.get('#preview-button').click();
                cy.get('#send-data-button').click();
                cy.wait(5000);
                cy.contains('Success');
                
                logDay(7, 21);
                clearArrays();
            });
            it('July 22 (Day 6)', function () {
                cy.fillSiteInfoBecca('site-villa', 'villa-camp2', '7', '22');
                
                addStaff('Yolanda Drew', 'TL', 0, 0);
                
                uncheckStaff();
                writeStaffValues();
                
                cy.get('#preview-button').click();
                cy.get('#send-data-button').click();
                cy.wait(5000);
                cy.contains('Success');
                
                logDay(7, 22);
                clearArrays();
            });
        });
    });
});


function testCamp(site, camp) {
    var fillParam1 = "";
    var fillParam2 = "";
    var campCode = "";
    var otherCampCode = "";
    var campCodeValue = "";

    if (camp === 1) {
        campCode = "Camp1Code";
        otherCampCode = "Camp1Code(2)";
    } else if (camp === 2) {
        campCode = "Camp2Code";
        otherCampCode = "Camp2Code(2)";
    } else if (camp === 3) {
        campCode = "Camp3Code";
    } else if (camp === 4) {
        campCode = "Camp4Code";
    } else if (camp === 5) {
        campCode = "Camp5Code";
    } else {
        campCode = "Camp6Code";
    }

    if (site === "Southwestern University") {
        fillParam1 = "site-sw";
        if (camp === 1) {
            campCodeValue = "TXS118 / TXJ118";
            fillParam2 = "sw-camp1";
        } else {
            campCodeValue = "TXQA118";
            fillParam2 = "sw-camp2";
        }
    } else if (site === "villaford University") {
        fillParam1 = "site-villa";
        if (camp === 1) {
            campCodeValue = "STS118";
            fillParam2 = "villa-camp1";
        } else if (camp === 2) {
            campCodeValue = "STJ118";
            fillParam2 = "villa-camp2";
        } else if (camp === 3) {
            campCodeValue = "STS218";
            fillParam2 = "villa-camp3";
        } else if (camp === 4) {
            campCodeValue = "STJ218";
            fillParam2 = "villa-camp4";
        } else if (camp === 5) {
            campCodeValue = "STS318";
            fillParam2 = "villa-camp5";
        } else {
            campCodeValue = "STS418";
            fillParam2 = "villa-camp6";
        }
    } else if (site === "University of Central Florida") {
        fillParam1 = "site-ucf";
        if (camp === 1) {
            campCodeValue = "FLJ118";
            fillParam2 = "ucf-camp1";
        } else {
            campCodeValue = "FLS118";
            fillParam2 = "ucf-camp2";
        }
    } else {
        fillParam1 = "site-villa";
        if (camp === 1) {
            campCodeValue = "PAS118";
            fillParam2 = "villa-camp1";
        } else {
            campCodeValue = "PAJ118";
            fillParam2 = "villa-camp2";
        }
    }

    context(site, function () {
        context(campCodeValue, function () {
            // To verify the same number of staff on the page as in the array
            var numberOfCreatedStaff = 0;
            var numberOfReportStaff = 0;

            // Add a test for each confirmed staff member
            hourlyStaffReportArray.forEach(function (staffMember) {
                if (staffMember[`${campCode}`] === campCodeValue || staffMember[`${otherCampCode}`] === campCodeValue) {
                    it(`${staffMember["First Name"]}` + " " + `${staffMember["Last Name"]}` + " should appear on the page.", function () {
                        cy.fillSiteInfo(fillParam1, fillParam2);
                        cy.contains(`${staffMember["First Name"]}` + " " + `${staffMember["Last Name"]}`);
                    });
                    numberOfReportStaff++;
                }
            });

            staffMembersAll.forEach(function (staffMember) {
                if (staffMember.campsWorking.includes(fillParam2)) {
                    numberOfCreatedStaff++;
                }
            });

            it("There should be the same number of staff on the page and in the report", function () {
                expect(numberOfCreatedStaff).to.equal(numberOfReportStaff);
            });
        });
    });
}