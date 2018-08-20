using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Configuration;
using TagIt.DataObject;

namespace TagIt.DBContext
{
    public class TagItDBContext : DbContext
    {

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<TagBlock>();
        }

        // Your context has been configured to use a 'UserNotificationBlock' connection string from your application's 
        // configuration file (App.config or Web.config). By default, this connection string targets the 
        // 'Mainstreet.EntityFramework.Implementation.UserNotificationBlock' database on your LocalDb instance. 
        // 
        // If you wish to target a different database and/or database provider, modify the 'UserNotificationBlock' 
        // connection string in the application configuration file.
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source=den1.mssql6.gear.host;Initial Catalog = tagit; Integrated Security = False;User ID = tagit; Password = Ct38m!2ZX~5m;MultipleActiveResultSets = True");
            base.OnConfiguring(optionsBuilder);
        }
        // Add a DbSet for each entity type that you want to include in your model. For more information 
        // on configuring and using a Code First model, see http://go.microsoft.com/fwlink/?LinkId=390109.

        public virtual DbSet<TagBlock> TagBlock { get; set; }

    }
}
