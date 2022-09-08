export enum RequestStateEnum {
    waitToOffer=1,
    offerTimeFinished = 2,
    waitToDo = 4,
    waitToPoll = 5,
    finished = 6,
    canceled = 7,
    expired = 8,
    ongoing = 10,
    canceledByWorker = 11,
    waitToPayment = 12,
    canceledByOperator = 13,
    Wait4DoAck = 14
}

 //waitToSurvey = 3,
//waitToAcceptSurvey = 9,