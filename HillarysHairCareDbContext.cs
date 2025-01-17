using Microsoft.EntityFrameworkCore;
using HillarysHairCare.Models;

public class HillarysHairCareDbContext : DbContext
{

    public DbSet<Stylist> Stylists { get; set; }
    public DbSet<Customer> Customers { get; set; }
    public DbSet<Service> Services { get; set; }
    public DbSet<Appointment> Appointments { get; set; }
    public DbSet<AppointmentService> AppointmentServices { get; set; }

    public HillarysHairCareDbContext(DbContextOptions<HillarysHairCareDbContext> context) : base(context)
    {

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Customer>().HasData(new Customer[]
        {
            new Customer {Id = 1, FirstName = "John", LastName = "Stamos", PhoneNumber = "816-555-1234", Email = "StamosJohn@Email.com"},
            new Customer {Id = 2, FirstName = "Mark", LastName = "Denmark", PhoneNumber = "153-555-9876", Email = "Mark@Denmark.Gov"},
            new Customer {Id = 3, FirstName = "Sarah", LastName = "Mcgill", PhoneNumber = "555-533-5343", Email = "ssarahM@Example.co"},
            new Customer {Id = 4, FirstName = "Triss", LastName = "Merrigold", PhoneNumber = "456-123-9559", Email = "TrissTheSorceress@Novigrad.place"},
            new Customer {Id = 5, FirstName = "John", LastName = "Shephard", PhoneNumber = "555-555-5555", Email = "CmdrShepN7@Normandy.spc"},
            new Customer {Id = 6, FirstName = "Panam", LastName = "Palmer", PhoneNumber = "818-555-2332", Email = "PanPam@NC.nom"}
        });
        modelBuilder.Entity<Stylist>().HasData(new Stylist[]
        {
            new Stylist {Id = 1, FirstName = "Dave", LastName = "Coulier", PhoneNumber = "565-565-5656", Email = "Joey@cutitout.sf", IsActive = true},
            new Stylist {Id = 2, FirstName = "Geralt", LastName = "Rivia", PhoneNumber = "919-191-5555", Email = "Wolfguy@Witcher.mon", IsActive = true},
            new Stylist {Id = 3, FirstName = "Garrus", LastName = "Vakarrian", PhoneNumber = "655-555-5556", Email = "GVak@C-Sec.hq", IsActive = true},
            new Stylist {Id = 4, FirstName = "Swiss", LastName = "Switzel", PhoneNumber = "111-555-1155", Email = "swiss@land.choc", IsActive = false},
            new Stylist {Id = 5, FirstName = "Judy", LastName = "Alvarez", PhoneNumber = "222-555-5522", Email = "JudeMoxx@BD.V", IsActive = false},
            new Stylist {Id = 6, FirstName = "Gale", LastName = "Waterdeep", PhoneNumber = "755-667-7776", Email = "Gale@Waterdeep.wiz", IsActive = true}
        });
        modelBuilder.Entity<Service>().HasData(new Service[]
        {
            new Service {Id = 1, Name = "Hair Cut", Price = 24.99M},
            new Service {Id = 2, Name = "Color", Price = 19.50M},
            new Service {Id = 3, Name = "Beard Trim", Price = 10.00M},
            new Service {Id = 4, Name = "Sparkle", Price = 40.99M},
            new Service {Id = 5, Name = "Compliment", Price = 99.99M}
        });
        modelBuilder.Entity<Appointment>().HasData(new Appointment[]
        {
            new Appointment {Id = 1, StartTime = new DateTime(2024, 2, 14, 9, 0, 0), StylistId = 2, CustomerId = 6},
            new Appointment {Id = 2, StartTime = new DateTime(2024, 6, 2, 10, 0, 0), StylistId = 3, CustomerId = 4},
            new Appointment {Id = 3, StartTime = new DateTime(2024, 11, 30, 14, 0, 0), StylistId = 6, CustomerId = 5},
            new Appointment {Id = 4, StartTime = new DateTime(2025, 1, 12, 16, 0, 0), StylistId = 1, CustomerId = 2}
        });
        modelBuilder.Entity<Appointment>()
        .HasMany(a => a.Services)
        .WithMany(s => s.Appointments)
        .UsingEntity<AppointmentService>();
        modelBuilder.Entity<AppointmentService>().HasData(new AppointmentService[]
        {
            new AppointmentService {Id = 1, AppointmentId = 1, ServiceId = 2},
            new AppointmentService {Id = 2, AppointmentId = 1, ServiceId = 5},
            new AppointmentService {Id = 3, AppointmentId = 2, ServiceId = 1},
            new AppointmentService {Id = 4, AppointmentId = 2, ServiceId = 4},
            new AppointmentService {Id = 5, AppointmentId = 3, ServiceId = 3},
            new AppointmentService {Id = 6, AppointmentId = 4, ServiceId = 1},
            new AppointmentService {Id = 7, AppointmentId = 4, ServiceId = 2},
            new AppointmentService {Id = 8, AppointmentId = 4, ServiceId = 4},
            new AppointmentService {Id = 9, AppointmentId = 4, ServiceId = 5}
        });
    }
}