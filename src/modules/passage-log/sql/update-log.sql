USE [RusGuardDB]
GO

UPDATE [dbo].[Log]
   SET [DateTime] = '2021-05-27 08:51:52'
      ,[LogMessageType] = 1
      ,[LogMessageSubType] = 66
      ,[Message] = 'Entrance'
      ,[Details] = 'By key Key number 9758666 (0x00000094E7CA)'
      ,[DriverID] = '3BCFD57F-527C-4D3A-B64F-030E6DA17CC6'
      ,[EmployeeID] = 'C8D71328-A53E-401E-B503-F7C8FE24026D'
      ,[OperatorID] = 'DA5F665D-09FD-4AC7-A6FD-FE149CBCE8C9'
      ,[ThirdPartyContentType] = NULL
      ,[ThirdPartyContentData] = NULL
 WHERE _id = '1073341'
GO
