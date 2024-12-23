# GasFeinApi.GasApiApi

All URIs are relative to *http://127.0.0.1:3005/api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**gasPricesProvinceCityGet**](GasApiApi.md#gasPricesProvinceCityGet) | **GET** /gas-prices/{province}/{city} | Get gas prices for a specific province and city



## gasPricesProvinceCityGet

> GasPricesProvinceCityGet200Response gasPricesProvinceCityGet(province, city)

Get gas prices for a specific province and city

### Example

```javascript
import GasFeinApi from 'gas_fein_api';
let defaultClient = GasFeinApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: BearerAuth
let BearerAuth = defaultClient.authentications['BearerAuth'];
BearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new GasFeinApi.GasApiApi();
let province = "province_example"; // String | The province to retrieve gas prices for
let city = "city_example"; // String | The city to retrieve gas prices for
apiInstance.gasPricesProvinceCityGet(province, city, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **province** | **String**| The province to retrieve gas prices for | 
 **city** | **String**| The city to retrieve gas prices for | 

### Return type

[**GasPricesProvinceCityGet200Response**](GasPricesProvinceCityGet200Response.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

