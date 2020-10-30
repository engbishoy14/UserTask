USE [master]
GO
/****** Object:  Database [UserDB]    Script Date: 10/30/2020 5:26:32 PM ******/
CREATE DATABASE [UserDB]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'UserDB', FILENAME = N'C:\Users\HP\UserDB.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'UserDB_log', FILENAME = N'C:\Users\HP\UserDB_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [UserDB] SET COMPATIBILITY_LEVEL = 130
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [UserDB].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [UserDB] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [UserDB] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [UserDB] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [UserDB] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [UserDB] SET ARITHABORT OFF 
GO
ALTER DATABASE [UserDB] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [UserDB] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [UserDB] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [UserDB] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [UserDB] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [UserDB] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [UserDB] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [UserDB] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [UserDB] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [UserDB] SET  ENABLE_BROKER 
GO
ALTER DATABASE [UserDB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [UserDB] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [UserDB] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [UserDB] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [UserDB] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [UserDB] SET READ_COMMITTED_SNAPSHOT ON 
GO
ALTER DATABASE [UserDB] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [UserDB] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [UserDB] SET  MULTI_USER 
GO
ALTER DATABASE [UserDB] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [UserDB] SET DB_CHAINING OFF 
GO
ALTER DATABASE [UserDB] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [UserDB] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [UserDB] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [UserDB] SET QUERY_STORE = OFF
GO
USE [UserDB]
GO
ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
GO
ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = OFF;
GO
USE [UserDB]
GO
/****** Object:  Table [dbo].[__MigrationHistory]    Script Date: 10/30/2020 5:26:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__MigrationHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ContextKey] [nvarchar](300) NOT NULL,
	[Model] [varbinary](max) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK_dbo.__MigrationHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC,
	[ContextKey] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Todoes]    Script Date: 10/30/2020 5:26:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Todoes](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](max) NULL,
	[Date] [datetime] NOT NULL,
	[UserID] [int] NOT NULL,
	[IsMark] [bit] NOT NULL,
 CONSTRAINT [PK_dbo.Todoes] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 10/30/2020 5:26:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[UserID] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [nvarchar](max) NULL,
	[UserEmail] [nvarchar](max) NULL,
	[UserPassword] [nvarchar](max) NULL,
 CONSTRAINT [PK_dbo.Users] PRIMARY KEY CLUSTERED 
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Index [IX_UserID]    Script Date: 10/30/2020 5:26:33 PM ******/
CREATE NONCLUSTERED INDEX [IX_UserID] ON [dbo].[Todoes]
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Todoes]  WITH CHECK ADD  CONSTRAINT [FK_dbo.Todoes_dbo.Users_UserID] FOREIGN KEY([UserID])
REFERENCES [dbo].[Users] ([UserID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Todoes] CHECK CONSTRAINT [FK_dbo.Todoes_dbo.Users_UserID]
GO
USE [master]
GO
ALTER DATABASE [UserDB] SET  READ_WRITE 
GO
