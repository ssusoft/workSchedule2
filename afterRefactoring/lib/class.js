module.exports = {
    soldier : function(platoon, name, job, discharge) {
        this.platoon = platoon;
        this.name = name;
        this.job = job;
        this.discharge = discharge;
    },

    worker : function(soldier, breakNum, nightNum, workNum){
        this.soldier = soldier;
        this.breakNum = breakNum; // 주말, 개인정비 시간
        this.nightNum = nightNum; // 야간
        this.workNum = workNum; // 총 근무 횟수
    },

    identificationData : function(mTotal, mExcept, mNow, mExceptContent, mUseable, mUsed, mExceptUse, dTotal, dExcept, dNow, dExceptContent, dUseable, dUsed, dExceptUse){
        this.mTotal = mTotal;
        this.mExcept = mExcept;
        this.mNow = mNow;
        this.mExceptContent = mExceptContent;
        this.mUseable = mUseable;
        this.mUsed = mUsed;
        this.mExceptUse = mExceptUse;
        this.dTotal = dTotal;
        this.dExcept = dExcept;
        this.dNow = dNow;
        this.dExceptContent = dExceptContent;
        this.dUseable = dUseable;
        this.dUsed = dUsed;
        this.dExceptUse = dExceptUse;
    },

    guardroomData : function(m8093, m9311, m1103, m0320, m2033, m3350, m5063, m6380, d8093, d9311, d1103, d0320, d2033, d3350, d5063, d6380){
        this.m8093 = m8093;
        this.m9311 = m9311;
        this.m1103 = m1103;
        this.m0320 = m0320;
        this.m2033 = m2033;
        this.m3350 = m3350;
        this.m5063 = m5063;
        this.m6380 = m6380;
        this.d8093 = d8093;
        this.d9311 = d9311;
        this.d1103 = d1103;
        this.d0320 = d0320;
        this.d2033 = d2033;
        this.d3350 = d3350;
        this.d5063 = d5063;
        this.d6380 = d6380;
    }
}