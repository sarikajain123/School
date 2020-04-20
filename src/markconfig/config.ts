
export function markCalculation( getmark, subjectFinalmark, percentageMark = 100 ) {
    const retMark = ( ( getmark * percentageMark ) / subjectFinalmark );
    return Math.floor(retMark);
}

export function markCalculationview( getmark, subjectFinalmark, percentageMark = 100 ) {

    if ( getmark == 0 || getmark == '' ) {
        return 0;
    } else {
        let retMark = (( getmark * 100 ) / subjectFinalmark );
        if ( retMark == 0 ) {
            return 0;
        } else {
            return Math.floor(retMark);
        }
    }
}

export function markData(response) {

    for (let markE in response.marksettings) {

        let totalExamMarks = 0;
        let totalSubjectMarks = 0;
        let totalMarkgpa = 0;
        let totalAveragegpa = 0;
        let totalSubject = 0;
        let totalAverageMarks = 0;
        let markpercentageKey = [];
        let markpercentageSubjectKey = [];
        const subjectKeys = [];
        for (let markS in response.marksettings[markE]) {
            if (response.optionalsubjectArr && markS == response.optionalsubjectArr[markS]) {
                if (response.optionalsubject && markS == response.optionalsubject.subjectID) {
                    subjectKeys.push(markS);
                    totalSubjectMarks =  Number(totalSubjectMarks) + Number(response.subjects[markS].finalmark);
                    totalSubject = Number(totalSubject + 1);
                }
            } else {
                subjectKeys.push(markS);
                totalSubjectMarks =  Number(totalSubjectMarks) + Number(response.subjects[markS].finalmark);
                totalSubject = Number(totalSubject + 1);
            }

            if (response.marks[markE] && response.marks[markE][markS]) {
                markpercentageSubjectKey = Object.keys(response.marksettings[markE][markS]['own']);
                const values = Object.keys(response.marksettings[markE][markS]['own']);
                const percentageId = Object.keys(response.marksettings[markE][markS]);
                percentageId.forEach((key) => {
                    if (key == 'unique') {
                        markpercentageKey = Object.keys(response.marksettings[markE][markS]['unique']);
                    }else {
                        markpercentageKey = Object.keys(response.marksettings[markE][markS]['own']);
                    }
                });

                let totalSumMark = 0;
                values.forEach((key) => {
                    totalSumMark = Number(totalSumMark) + Number(response.marks[markE][markS][key]);
                });
                response.marksettings[markE][markS].totalSumMark = totalSumMark;
                totalExamMarks =  Number(totalExamMarks) + Number(totalSumMark);
                let greadMark = markCalculation(totalSumMark, response.subjects[markS].finalmark, 100);
                response.grades.forEach((grade) => {
                    if (grade.gradefrom <= greadMark && grade.gradeupto >= greadMark) {
                        totalMarkgpa = Number(totalMarkgpa) + Number(grade.point);
                        response.marksettings[markE][markS].gradepoint = grade.point;
                        response.marksettings[markE][markS].grade = grade.grade;
                    }
                });
                response.marksettings[markE][markS].markpercentageSubjectKey = markpercentageSubjectKey;
            }
        }

        const greadAverageMarks = markCalculationview(totalExamMarks, totalSubjectMarks, 100);
        totalAverageMarks = Number(totalExamMarks / totalSubject);
        totalAveragegpa = Number(totalMarkgpa / totalSubject);
        response.marksettings[markE].totalSubjectMarks = totalSubjectMarks.toFixed(2);
        response.marksettings[markE].totalExamMarks = totalExamMarks.toFixed(2);
        response.marksettings[markE].totalAverageMarks = totalAverageMarks.toFixed(2);
        response.marksettings[markE].greadAverageMarks = greadAverageMarks.toFixed(2);
        response.marksettings[markE].totalAveragegpa = totalAveragegpa.toFixed(2);
        response.marksettings[markE].markpercentageKey = markpercentageKey;
        response.marksettings[markE].subjectKeys = subjectKeys;

    }

    return response;
}