# GasFeinApi.ServiceRouteApi

All URIs are relative to *http://localhost:3000/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**directionsGet**](ServiceRouteApi.md#directionsGet) | **GET** /directions/ | Get directions



## directionsGet

> DirectionsGet200Response directionsGet()

Get directions

### Example

```javascript
import GasFeinApi from 'gas_fein_api';
let defaultClient = GasFeinApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: BearerAuth
let BearerAuth = defaultClient.authentications['BearerAuth'];
BearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new GasFeinApi.ServiceRouteApi();
apiInstance.directionsGet((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**DirectionsGet200Response**](DirectionsGet200Response.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

