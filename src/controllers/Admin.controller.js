const controller = require("./controller");
const adminServices = require("../services/Admin.service");

exports.createUserAsync = async (req, res, next) => {
  try {
    const resServices = await adminServices.createUserAsync(req.value.body);

    if (resServices.success) {
      return controller.sendSuccess(
        res,
        resServices.data,
        200,
        resServices.message
      );
    }
    return controller.sendSuccess(
      res,
      resServices.data,
      300,
      resServices.message
    );
  } catch (error) {
    // bug
    console.log(error);
    return controller.sendError(res);
  }
};

exports.loginAsync = async (req, res, next) => {
  try {
    const resServices = await adminServices.loginAsync(req.value.body);
    if (!resServices.success) {
      return controller.sendSuccess(res, {}, 300, resServices.message);
    }
    return controller.sendSuccess(
      res,
      resServices.data,
      200,
      resServices.message
    );
  } catch (err) {
    console.log(err);
    return controller.sendError(res);
  }
};

exports.quantityStatisticsAdminAsync = async (req, res, next) => {
  try {
    const resServices = await adminServices.quantityStatisticsAdminAsync();

    if (resServices.success) {
      return controller.sendSuccess(
        res,
        resServices.data,
        200,
        resServices.message
      );
    }
    return controller.sendSuccess(
      res,
      resServices.data,
      300,
      resServices.message
    );
  } catch (error) {
    // bug
    console.log(error);
    return controller.sendError(res);
  }
};

exports.statisticsBillAdminAsync = async (req, res, next) => {
  try {
    const resServices = await adminServices.statisticsBillAdminAsync();

    if (resServices.success) {
      return controller.sendSuccess(
        res,
        resServices.data,
        200,
        resServices.message
      );
    }
    return controller.sendSuccess(
      res,
      resServices.data,
      300,
      resServices.message
    );
  } catch (error) {
    // bug
    console.log(error);
    return controller.sendError(res);
  }
};

exports.getBestSellProductAdminAsync = async (req, res, next) => {
  try {
    const resServices = await adminServices.getBestSellProductAdminAsync();

    if (resServices.success) {
      return controller.sendSuccess(
        res,
        resServices.data,
        200,
        resServices.message
      );
    }
    return controller.sendSuccess(
      res,
      resServices.data,
      300,
      resServices.message
    );
  } catch (error) {
    // bug
    console.log(error);
    return controller.sendError(res);
  }
};

exports.statisticsReviewAdminAsync = async (req, res, next) => {
  try {
    const resServices = await adminServices.statisticsReviewAdminAsync();

    if (resServices.success) {
      return controller.sendSuccess(
        res,
        resServices.data,
        200,
        resServices.message
      );
    }
    return controller.sendSuccess(
      res,
      resServices.data,
      300,
      resServices.message
    );
  } catch (error) {
    // bug
    console.log(error);
    return controller.sendError(res);
  }
};

exports.getReviewNewAdminAsync = async (req, res, next) => {
  try {
    const resServices = await adminServices.getReviewNewAdminAsync();

    if (resServices.success) {
      return controller.sendSuccess(
        res,
        resServices.data,
        200,
        resServices.message
      );
    }
    return controller.sendSuccess(
      res,
      resServices.data,
      300,
      resServices.message
    );
  } catch (error) {
    // bug
    console.log(error);
    return controller.sendError(res);
  }
};
function formatDate(date) {
  return new Date(date).toISOString().split("T")[0];
}
exports.getStatisticsSellAdminAsync = async (req, res, next) => {
  try {
    var timeStart = req.query.timeStart;
    var timeEnd = req.query.timeEnd;

    const currentTime = new Date(timeStart);

    //const start = new Date(currentTime.getTime() - 7 * 3600 * 1000);
    const start = new Date(currentTime.getTime());
    //startDate = new Date(startDate).toISOString().slice(0, 10);
    let endTimeByDay = new Date(timeEnd).setHours(23, 59, 59, 999);
    //const end = new Date(new Date(endTimeByDay).getTime() - 7 * 3600 * 1000);
    const end = new Date(new Date(endTimeByDay).getTime());

    //var day = new Date(end.getTime() - start.getTime());
    var difference = Math.abs(end - start);
    var days = difference / (1000 * 3600 * 24);
    var changeDays = Math.floor(days);
    var result = [];
    if (changeDays < days) changeDays = changeDays + 1;
    for (let i = 0; i < changeDays; i++) {
      var dayCurrent = new Date(timeStart);
      dayCurrent = dayCurrent.setDate(start.getDate() + i);
      var formatDayCurrent = formatDate(dayCurrent);
      var bodyTime = {
        timeStart: formatDayCurrent,
        timeEnd: formatDayCurrent,
      };
      const resServices = await adminServices.getStatisticsSellAdminAsync(bodyTime);
      if (resServices.success == false) {
        return controller.sendSuccess(
          res,
          null,
          300,
          "Don't get statistic by Admin"
        );
      }
    //   var obj = {};
    //   obj[`${formatDayCurrent}`] = resServices.data;
      result.push(resServices.data);
    }

    return controller.sendSuccess(
      res,
      result,
      200,
      "Get statistic order success"
    );
  } catch (error) {
    // bug
    console.log(error);
    return controller.sendError(res);
  }
};
