# GasFeinApi.UsersApi

All URIs are relative to *http://192.168.2.15:3005/api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**usersLoginJwtPost**](UsersApi.md#usersLoginJwtPost) | **POST** /users/login/jwt | Authenticate user using JWT token
[**usersLoginPost**](UsersApi.md#usersLoginPost) | **POST** /users/login | Authenticate user by email and password
[**usersPost**](UsersApi.md#usersPost) | **POST** /users | Create a new user
[**usersUserIdDelete**](UsersApi.md#usersUserIdDelete) | **DELETE** /users/{userId} | Delete a user by ID
[**usersUserIdGet**](UsersApi.md#usersUserIdGet) | **GET** /users/{userId} | Get a user by ID
[**usersUserIdPut**](UsersApi.md#usersUserIdPut) | **PUT** /users/{userId} | Update an existing user&#39;s details



## usersLoginJwtPost

> usersLoginJwtPost(usersLoginJwtPostRequest)

Authenticate user using JWT token

### Example

```javascript
import GasFeinApi from 'gas_fein_api';
let defaultClient = GasFeinApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: BearerAuth
let BearerAuth = defaultClient.authentications['BearerAuth'];
BearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new GasFeinApi.UsersApi();
let usersLoginJwtPostRequest = new GasFeinApi.UsersLoginJwtPostRequest(); // UsersLoginJwtPostRequest | 
apiInstance.usersLoginJwtPost(usersLoginJwtPostRequest, (error, data, response) => {
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
 **usersLoginJwtPostRequest** | [**UsersLoginJwtPostRequest**](UsersLoginJwtPostRequest.md)|  | 

### Return type

null (empty response body)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: Not defined


## usersLoginPost

> usersLoginPost(usersLoginPostRequest)

Authenticate user by email and password

### Example

```javascript
import GasFeinApi from 'gas_fein_api';
let defaultClient = GasFeinApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: BearerAuth
let BearerAuth = defaultClient.authentications['BearerAuth'];
BearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new GasFeinApi.UsersApi();
let usersLoginPostRequest = new GasFeinApi.UsersLoginPostRequest(); // UsersLoginPostRequest | 
apiInstance.usersLoginPost(usersLoginPostRequest, (error, data, response) => {
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
 **usersLoginPostRequest** | [**UsersLoginPostRequest**](UsersLoginPostRequest.md)|  | 

### Return type

null (empty response body)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: Not defined


## usersPost

> usersPost(usersUserIdPutRequest)

Create a new user

### Example

```javascript
import GasFeinApi from 'gas_fein_api';
let defaultClient = GasFeinApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: BearerAuth
let BearerAuth = defaultClient.authentications['BearerAuth'];
BearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new GasFeinApi.UsersApi();
let usersUserIdPutRequest = new GasFeinApi.UsersUserIdPutRequest(); // UsersUserIdPutRequest | 
apiInstance.usersPost(usersUserIdPutRequest, (error, data, response) => {
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
 **usersUserIdPutRequest** | [**UsersUserIdPutRequest**](UsersUserIdPutRequest.md)|  | 

### Return type

null (empty response body)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: Not defined


## usersUserIdDelete

> usersUserIdDelete(userId)

Delete a user by ID

### Example

```javascript
import GasFeinApi from 'gas_fein_api';
let defaultClient = GasFeinApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: BearerAuth
let BearerAuth = defaultClient.authentications['BearerAuth'];
BearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new GasFeinApi.UsersApi();
let userId = 56; // Number | The ID of the user to delete
apiInstance.usersUserIdDelete(userId, (error, data, response) => {
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
 **userId** | **Number**| The ID of the user to delete | 

### Return type

null (empty response body)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


## usersUserIdGet

> usersUserIdGet(userId)

Get a user by ID

### Example

```javascript
import GasFeinApi from 'gas_fein_api';
let defaultClient = GasFeinApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: BearerAuth
let BearerAuth = defaultClient.authentications['BearerAuth'];
BearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new GasFeinApi.UsersApi();
let userId = 56; // Number | The ID of the user
apiInstance.usersUserIdGet(userId, (error, data, response) => {
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
 **userId** | **Number**| The ID of the user | 

### Return type

null (empty response body)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


## usersUserIdPut

> usersUserIdPut(userId, usersUserIdPutRequest)

Update an existing user&#39;s details

### Example

```javascript
import GasFeinApi from 'gas_fein_api';
let defaultClient = GasFeinApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: BearerAuth
let BearerAuth = defaultClient.authentications['BearerAuth'];
BearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new GasFeinApi.UsersApi();
let userId = 56; // Number | The ID of the user to update
let usersUserIdPutRequest = new GasFeinApi.UsersUserIdPutRequest(); // UsersUserIdPutRequest | 
apiInstance.usersUserIdPut(userId, usersUserIdPutRequest, (error, data, response) => {
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
 **userId** | **Number**| The ID of the user to update | 
 **usersUserIdPutRequest** | [**UsersUserIdPutRequest**](UsersUserIdPutRequest.md)|  | 

### Return type

null (empty response body)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: Not defined

