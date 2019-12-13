module.exports = {
    soldier : function(platoon, name, job, discharge, breakNum, nightNum, workNum) {
        this.platoon = platoon;
        this.name = name;
        this.job = job;
        this.discharge = discharge;
        this.breakNum = breakNum; // 주말, 개인정비 시간
        this.nightNum = nightNum; // 야간
        this.workNum = workNum; // 총 근무 횟수
    }
}