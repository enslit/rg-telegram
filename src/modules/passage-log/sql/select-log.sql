USE [RusGuardDB]
GO

SELECT [Log].[_id] as logId
	  ,[Employee].[_id] as employeeId
      ,[DateTime]
      ,[LogMessageType]
      ,[LogMessageSubType]
      ,[Message]
      ,[Details]
      ,[DriverID]
      ,[EmployeeID]
      ,[OperatorID]
      ,[ThirdPartyContentType]
      ,[ThirdPartyContentData]
  FROM [dbo].[Log]
  JOIN [dbo].[Employee] ON Employee._id=Log.EmployeeID
  WHERE [Employee].[LastName] = 'Емельянов' AND [Employee].[FirstName] = 'Александр' AND DateTime > '2021-05-27 00:00:00' AND DateTime < '2021-05-27 23:59:59'
GO
