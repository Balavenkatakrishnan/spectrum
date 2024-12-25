const axios = require('axios');

const getUrl = 'https://data-collection-fbn6t4.5sc6y6-1.usa-e2.cloudhub.io/api/fetchData';
const postUrl = 'https://data-collection-fbn6t4.5sc6y6-1.usa-e2.cloudhub.io/api/createAlert';

const processData = async (req, res) => {
  try {
    const response = await axios.get(getUrl, {
      params: {
        operationalStatus: 'Operational',
        customerFacingFlag: true,
        inCommissionFlag: true,
      },
    });
    
    const responseData = response?.data;
    const availableData = responseData.data.resultSet.filter(
      (item) => item.status === 'Available'
    );
    
    const liftData = availableData.map((item) => ({
      StationName: item.station.name,
      CRSCode: item.station.crsCode,
      SensorId: item.sensorId,
    }));
    
    const requestBody = {
      LiftData: liftData,
    };
    
    const postResponse = await axios.post(postUrl, requestBody);
    
    res.json({
      message: 'Data processed successfully',
      postResponse: postResponse.data,
    });
  } catch (error) {
    console.error('Error processing data:', error);
    res.status(500).json({
      message: 'An error occurred while processing data',
      error: error.message,
    });
  }
};

module.exports = {
  processData,
};
