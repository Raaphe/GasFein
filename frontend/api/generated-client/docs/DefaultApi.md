# GasFeinApi.DefaultApi

All URIs are relative to *http://localhost:3000/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**directionsCoordinatesGet**](DefaultApi.md#directionsCoordinatesGet) | **GET** /directions/coordinates | Get directions with multiple coordinates



## directionsCoordinatesGet

> directionsCoordinatesGet(points)

Get directions with multiple coordinates

### Example

```javascript
import GasFeinApi from 'gas_fein_api';
let defaultClient = GasFeinApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: BearerAuth
let BearerAuth = defaultClient.authentications['BearerAuth'];
BearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new GasFeinApi.DefaultApi();
let points = "points_example"; // String | 
apiInstance.directionsCoordinatesGet(points, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **points** | **String**|  | 

### Return type

null (empty response body)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

