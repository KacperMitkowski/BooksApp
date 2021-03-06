USE [master]
GO
/****** Object:  Database [KMdb]    Script Date: 24.01.2021 21:48:38 ******/
CREATE DATABASE [KMdb]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Books', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\Books.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'Books_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\Books_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [KMdb] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [KMdb].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [KMdb] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [KMdb] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [KMdb] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [KMdb] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [KMdb] SET ARITHABORT OFF 
GO
ALTER DATABASE [KMdb] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [KMdb] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [KMdb] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [KMdb] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [KMdb] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [KMdb] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [KMdb] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [KMdb] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [KMdb] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [KMdb] SET  DISABLE_BROKER 
GO
ALTER DATABASE [KMdb] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [KMdb] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [KMdb] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [KMdb] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [KMdb] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [KMdb] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [KMdb] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [KMdb] SET RECOVERY FULL 
GO
ALTER DATABASE [KMdb] SET  MULTI_USER 
GO
ALTER DATABASE [KMdb] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [KMdb] SET DB_CHAINING OFF 
GO
ALTER DATABASE [KMdb] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [KMdb] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [KMdb] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [KMdb] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'KMdb', N'ON'
GO
ALTER DATABASE [KMdb] SET QUERY_STORE = OFF
GO
USE [KMdb]
GO
/****** Object:  Table [dbo].[admin]    Script Date: 24.01.2021 21:48:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[admin](
	[admin_id] [bigint] IDENTITY(1,1) NOT NULL,
	[admin_group_id] [bigint] NULL,
	[login] [nvarchar](1000) NULL,
	[password] [nvarchar](1000) NULL,
 CONSTRAINT [PK_admin] PRIMARY KEY CLUSTERED 
(
	[admin_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [IX_admin] UNIQUE NONCLUSTERED 
(
	[admin_group_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[admin_group]    Script Date: 24.01.2021 21:48:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[admin_group](
	[admin_group_id] [bigint] IDENTITY(1,1) NOT NULL,
	[admin_id] [bigint] NOT NULL,
	[group_id] [bigint] NOT NULL,
 CONSTRAINT [PK_admin_group] PRIMARY KEY CLUSTERED 
(
	[admin_group_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[author]    Script Date: 24.01.2021 21:48:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[author](
	[author_id] [bigint] IDENTITY(1,1) NOT NULL,
	[author_group_id] [bigint] NULL,
	[first_name] [nvarchar](1000) NULL,
	[last_name] [nvarchar](1000) NULL,
	[login] [nvarchar](1000) NULL,
	[password] [nvarchar](1000) NULL,
	[status] [nvarchar](1000) NULL,
 CONSTRAINT [PK_author] PRIMARY KEY CLUSTERED 
(
	[author_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [IX_author] UNIQUE NONCLUSTERED 
(
	[author_group_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[author_group]    Script Date: 24.01.2021 21:48:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[author_group](
	[author_group_id] [bigint] IDENTITY(1,1) NOT NULL,
	[author_id] [bigint] NOT NULL,
	[group_id] [bigint] NOT NULL,
 CONSTRAINT [PK_author_group] PRIMARY KEY CLUSTERED 
(
	[author_group_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[book]    Script Date: 24.01.2021 21:48:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[book](
	[book_id] [bigint] IDENTITY(1,1) NOT NULL,
	[genre_id] [bigint] NOT NULL,
	[author_id] [bigint] NOT NULL,
	[title] [nvarchar](1000) NULL,
	[description] [nvarchar](1000) NULL,
	[publication_date] [date] NULL,
	[isbn] [nvarchar](1000) NULL,
	[status] [nvarchar](1000) NULL,
 CONSTRAINT [PK_book] PRIMARY KEY CLUSTERED 
(
	[book_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[genre]    Script Date: 24.01.2021 21:48:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[genre](
	[genre_id] [bigint] IDENTITY(1,1) NOT NULL,
	[title] [nvarchar](1000) NULL,
 CONSTRAINT [PK_genre] PRIMARY KEY CLUSTERED 
(
	[genre_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[group]    Script Date: 24.01.2021 21:48:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[group](
	[group_id] [bigint] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](1000) NULL,
 CONSTRAINT [PK_group] PRIMARY KEY CLUSTERED 
(
	[group_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[group_setting]    Script Date: 24.01.2021 21:48:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[group_setting](
	[group_setting_id] [bigint] IDENTITY(1,1) NOT NULL,
	[group_id] [bigint] NOT NULL,
	[setting_id] [bigint] NOT NULL,
 CONSTRAINT [PK_group_setting] PRIMARY KEY CLUSTERED 
(
	[group_setting_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[log]    Script Date: 24.01.2021 21:48:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[log](
	[log_id] [bigint] IDENTITY(1,1) NOT NULL,
	[book_id] [bigint] NULL,
	[author_id] [bigint] NULL,
	[admin_id] [bigint] NULL,
	[event_name] [nvarchar](1000) NULL,
	[event_date] [datetime] NULL,
	[old_value] [nvarchar](1000) NULL,
	[new_value] [nvarchar](1000) NULL,
 CONSTRAINT [PK_log] PRIMARY KEY CLUSTERED 
(
	[log_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[setting]    Script Date: 24.01.2021 21:48:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[setting](
	[setting_id] [bigint] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](1000) NULL,
 CONSTRAINT [PK_setting] PRIMARY KEY CLUSTERED 
(
	[setting_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[admin]  WITH CHECK ADD  CONSTRAINT [FK_admin_admin_group] FOREIGN KEY([admin_group_id])
REFERENCES [dbo].[admin_group] ([admin_group_id])
GO
ALTER TABLE [dbo].[admin] CHECK CONSTRAINT [FK_admin_admin_group]
GO
ALTER TABLE [dbo].[admin_group]  WITH CHECK ADD  CONSTRAINT [FK_admin_group_group] FOREIGN KEY([group_id])
REFERENCES [dbo].[group] ([group_id])
GO
ALTER TABLE [dbo].[admin_group] CHECK CONSTRAINT [FK_admin_group_group]
GO
ALTER TABLE [dbo].[author_group]  WITH CHECK ADD  CONSTRAINT [FK_author_group_author] FOREIGN KEY([author_id])
REFERENCES [dbo].[author] ([author_id])
GO
ALTER TABLE [dbo].[author_group] CHECK CONSTRAINT [FK_author_group_author]
GO
ALTER TABLE [dbo].[author_group]  WITH CHECK ADD  CONSTRAINT [FK_author_group_group] FOREIGN KEY([group_id])
REFERENCES [dbo].[group] ([group_id])
GO
ALTER TABLE [dbo].[author_group] CHECK CONSTRAINT [FK_author_group_group]
GO
ALTER TABLE [dbo].[book]  WITH CHECK ADD  CONSTRAINT [FK_book_author] FOREIGN KEY([author_id])
REFERENCES [dbo].[author] ([author_id])
GO
ALTER TABLE [dbo].[book] CHECK CONSTRAINT [FK_book_author]
GO
ALTER TABLE [dbo].[book]  WITH CHECK ADD  CONSTRAINT [FK_book_genre] FOREIGN KEY([genre_id])
REFERENCES [dbo].[genre] ([genre_id])
GO
ALTER TABLE [dbo].[book] CHECK CONSTRAINT [FK_book_genre]
GO
ALTER TABLE [dbo].[group_setting]  WITH CHECK ADD  CONSTRAINT [FK_group_setting_group] FOREIGN KEY([group_id])
REFERENCES [dbo].[group] ([group_id])
GO
ALTER TABLE [dbo].[group_setting] CHECK CONSTRAINT [FK_group_setting_group]
GO
ALTER TABLE [dbo].[group_setting]  WITH CHECK ADD  CONSTRAINT [FK_group_setting_setting] FOREIGN KEY([setting_id])
REFERENCES [dbo].[setting] ([setting_id])
GO
ALTER TABLE [dbo].[group_setting] CHECK CONSTRAINT [FK_group_setting_setting]
GO
ALTER TABLE [dbo].[log]  WITH CHECK ADD  CONSTRAINT [FK_log_admin] FOREIGN KEY([admin_id])
REFERENCES [dbo].[admin] ([admin_id])
GO
ALTER TABLE [dbo].[log] CHECK CONSTRAINT [FK_log_admin]
GO
ALTER TABLE [dbo].[log]  WITH CHECK ADD  CONSTRAINT [FK_log_author] FOREIGN KEY([author_id])
REFERENCES [dbo].[author] ([author_id])
GO
ALTER TABLE [dbo].[log] CHECK CONSTRAINT [FK_log_author]
GO
ALTER TABLE [dbo].[log]  WITH CHECK ADD  CONSTRAINT [FK_log_book] FOREIGN KEY([book_id])
REFERENCES [dbo].[book] ([book_id])
GO
ALTER TABLE [dbo].[log] CHECK CONSTRAINT [FK_log_book]
GO
USE [master]
GO
ALTER DATABASE [KMdb] SET  READ_WRITE 
GO
