using HillarysHairCare.Models;
using HillarysHairCare.Models.DTOs;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Http.Json;
using System.Reflection.Metadata.Ecma335;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// allows passing datetimes without time zone data 
AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

// allows our api endpoints to access the database through Entity Framework Core
builder.Services.AddNpgsql<HillarysHairCareDbContext>(builder.Configuration["HillarysHairCareDbConnectionString"]);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

//------------->Appointments<-----------------

app.MapGet("/api/appointments", (HillarysHairCareDbContext db) =>
{
    return db.Appointments
    .Include(a => a.Stylist)
    .Include(a => a.Customer)
    .OrderBy(a => a.StartTime)
    .Select(a => new AppointmentDTO
    {
        Id = a.Id,
        StartTime = a.StartTime,
        StylistId = a.StylistId,
        Stylist = new StylistDTO
        {
            Id = a.Stylist.Id,
            FirstName = a.Stylist.FirstName,
            LastName = a.Stylist.LastName,
            PhoneNumber = a.Stylist.PhoneNumber,
            Email = a.Stylist.Email,
            IsActive = a.Stylist.IsActive
        },
        CustomerId = a.CustomerId,
        Customer = new CustomerDTO
        {
            Id = a.Customer.Id,
            FirstName = a.Customer.FirstName,
            LastName = a.Customer.LastName,
            PhoneNumber = a.Customer.PhoneNumber,
            Email = a.Customer.Email
        },
        Services = a.Services.Select(s => new ServiceDTO
        {
            Id = s.Id,
            Name = s.Name,
            Price = s.Price
        }).ToList()
    });
});

app.MapGet("/api/appointments/{id}", (HillarysHairCareDbContext db, int id) => {
    return db.Appointments
    .Include(a => a.Stylist)
    .Include(a => a.Customer)
    .Select(a => new AppointmentDTO
    {
        Id = a.Id,
        StartTime = a.StartTime,
        StylistId = a.StylistId,
        Stylist = new StylistDTO
        {
            Id = a.Stylist.Id,
            FirstName = a.Stylist.FirstName,
            LastName = a.Stylist.LastName,
            PhoneNumber = a.Stylist.PhoneNumber,
            Email = a.Stylist.Email,
            IsActive = a.Stylist.IsActive
        },
        CustomerId = a.CustomerId,
        Customer = new CustomerDTO
        {
            Id = a.Customer.Id,
            FirstName = a.Customer.FirstName,
            LastName = a.Customer.LastName,
            PhoneNumber = a.Customer.PhoneNumber,
            Email = a.Customer.Email
        },
        Services = a.Services.Select(s => new ServiceDTO
        {   
            Id = s.Id,
            Name = s.Name,
            Price = s.Price
        }).ToList()
    }).SingleOrDefault(a => a.Id == id) is AppointmentDTO appointment ? 
    Results.Ok(appointment) : 
    Results.NotFound();
});

app.MapPost("/api/appointments", async (HillarysHairCareDbContext db, Appointment appointment) =>
{
    List<int> serviceIds = appointment.Services.Select(s => s.Id).ToList();
    List<Service> services = await db.Services
    .Where(s => serviceIds
    .Contains(s.Id))
    .ToListAsync();

    appointment.Services = services;

    db.Appointments.Add(appointment);
    db.SaveChanges();

    return Results.Created($"api/appointments/{appointment.Id}", new AppointmentDTO
    {
        Id = appointment.Id,
        StartTime = appointment.StartTime,
        StylistId = appointment.StylistId,
        CustomerId = appointment.CustomerId,
        Services = appointment.Services.Select(s => new ServiceDTO
        {
            Id = s.Id,
            Name = s.Name,
            Price = s.Price
        }).ToList()
    });
});

app.MapDelete("/api/appointments/{id}", (HillarysHairCareDbContext db, int id) => 
{
    Appointment appointment = db.Appointments.SingleOrDefault(a => a.Id == id);

    if (appointment == null)
    {
        return Results.NotFound();
    }

    db.Appointments.Remove(appointment);
    db.SaveChanges();
    return Results.NoContent();
});

//------------>Services<--------------

app.MapGet("/api/services", (HillarysHairCareDbContext db) => 
{
    return db.Services
    .Select(s => new ServiceDTO
    {
        Id = s.Id,
        Name = s.Name,
        Price = s.Price
    }).ToList();
});

//----------->Customers<---------------

app.MapGet("/api/customers", (HillarysHairCareDbContext db) => 
{
    return db.Customers
    .Include(c => c.Appointments)
    .ThenInclude(a => a.Stylist)
    .Select(c => new CustomerDTO
    {
        Id = c.Id,
        FirstName = c.FirstName,
        LastName = c.LastName,
        PhoneNumber = c.PhoneNumber,
        Email = c.Email,
        Appointments = c.Appointments.Select(a => new AppointmentDTO
        {
            Id = a.Id,
            StartTime = a.StartTime,
            StylistId = a.StylistId,
            Stylist = new StylistDTO
            {
                Id = a.Stylist.Id,
                FirstName = a.Stylist.FirstName,
                LastName = a.Stylist.LastName,
                PhoneNumber = a.Stylist.PhoneNumber,
                Email = a.Stylist.Email,
                IsActive = a.Stylist.IsActive
            },
            CustomerId = c.Id,
            Services = a.Services.Select(s => new ServiceDTO
            {
                Id = s.Id,
                Name = s.Name,
                Price = s.Price
            }).ToList()
        }).ToList()
    });
});

app.MapGet("/api/customers/{id}", (int id, HillarysHairCareDbContext db) =>
{
    return db.Customers
    .Include(c => c.Appointments)
    .ThenInclude(a => a.Stylist)
    .Select(c => new CustomerDTO
    {
        Id = c.Id,
        FirstName = c.FirstName,
        LastName = c.LastName,
        PhoneNumber = c.PhoneNumber,
        Email = c.Email,
        Appointments = c.Appointments
        .OrderBy(a => a.StartTime)
        .Select(a => new AppointmentDTO
        {
            Id = a.Id,
            StartTime = a.StartTime,
            StylistId = a.StylistId,
            Stylist = new StylistDTO
            {
                Id = a.Stylist.Id,
                FirstName = a.Stylist.FirstName,
                LastName = a.Stylist.LastName,
                PhoneNumber = a.Stylist.PhoneNumber,
                Email = a.Stylist.Email
            },
            CustomerId = a.CustomerId,
            Services = a.Services.Select(s => new ServiceDTO
            {
                Id = s.Id,
                Name = s.Name,
                Price = s.Price
            }).ToList()
        }).ToList()
    }).SingleOrDefault(c => c.Id == id) is CustomerDTO customer ? 
    Results.Ok(customer) : 
    Results.NoContent();
});

app.MapPut("/api/customers/{id}", (int id, HillarysHairCareDbContext db, Customer customer) => 
{
    Customer customerToUpdate = db.Customers.SingleOrDefault(c => c.Id == id);

    if (customerToUpdate == null)
    {
        return Results.NotFound();
    }

    customerToUpdate.FirstName = customer.FirstName;
    customerToUpdate.LastName = customer.LastName;
    customerToUpdate.PhoneNumber = customer.PhoneNumber;
    customerToUpdate.Email = customer.Email;

    db.SaveChanges();
    return Results.NoContent();
});

//---------->Stylists<---------------

app.MapGet("/api/stylists", (HillarysHairCareDbContext db) =>
{
    return db.Stylists
    .Include(s => s.Appointments)
    .ThenInclude(a => a.Customer)
    .Where(s => s.IsActive == true)
    .Select(s => new StylistDTO
    {
        Id = s.Id,
        FirstName = s.FirstName,
        LastName = s.LastName,
        PhoneNumber = s.PhoneNumber,
        Email = s.Email,
        IsActive = s.IsActive,
        Appointments = s.Appointments.Select(a => new AppointmentDTO
        {
            Id = a.Id,
            StartTime = a.StartTime,
            StylistId = s.Id,
            CustomerId = a.CustomerId,
            Customer = new CustomerDTO
            {
                Id = a.Customer.Id,
                FirstName = a.Customer.FirstName,
                LastName = a.Customer.LastName,
                PhoneNumber = a.Customer.PhoneNumber,
                Email = a.Customer.Email
            },
            Services = a.Services.Select(s => new ServiceDTO
            {
                Id = s.Id,
                Name = s.Name,
                Price = s.Price
            }).ToList()
        }).ToList()
    });
});

app.MapGet("/api/stylists/{id}", (HillarysHairCareDbContext db, int id) =>
{
    return db.Stylists
    .Include(s => s.Appointments)
    .ThenInclude(a => a.Customer)
    .Select(s => new StylistDTO
    {
        Id = s.Id,
        FirstName = s.FirstName,
        LastName = s.LastName,
        PhoneNumber = s.PhoneNumber,
        Email = s.Email,
        Appointments = s.Appointments
        .OrderBy(a => a.StartTime)
        .Select(a => new AppointmentDTO
        {
            Id = a.Id,
            StartTime = a.StartTime,
            CustomerId = a.CustomerId,
            Customer = new CustomerDTO
            {
                Id = a.Customer.Id,
                FirstName = a.Customer.FirstName,
                LastName = a.Customer.LastName,
                PhoneNumber = a.Customer.PhoneNumber,
                Email = a.Customer.Email
            },
            Services = a.Services.Select(s => new ServiceDTO
            {
                Id = s.Id,
                Name = s.Name,
                Price = s.Price
            }).ToList()
        }).ToList()
    }).SingleOrDefault(s => s.Id == id) is StylistDTO stylist ? 
    Results.Ok(stylist) :
    Results.NotFound();
    
});

app.MapPost("/api/stylists", (HillarysHairCareDbContext db, Stylist stylist) => 
{
    db.Stylists.Add(stylist);
    db.SaveChanges();
    return Results.Created($"/api/stylists/{stylist.Id}", stylist);
});

app.MapPost("/api/stylists/{id}/deactivate", (HillarysHairCareDbContext db, int id) =>
{
    Stylist stylistToDeactivate = db.Stylists.SingleOrDefault(s => s.Id == id);

    if (stylistToDeactivate == null)
    {
        return Results.NotFound();
    }

    stylistToDeactivate.IsActive = false;
    db.SaveChanges();
    return Results.NoContent();
});

app.MapPut("/api/stylists/{id}", (HillarysHairCareDbContext db, int id, Stylist stylist) => 
{
    Stylist stylistToUpdate = db.Stylists.SingleOrDefault(s=> s.Id == id);

    if (stylistToUpdate == null)
    {
        return Results.NotFound();
    }

    stylistToUpdate.FirstName = stylist.FirstName;
    stylistToUpdate.LastName = stylist.LastName;
    stylistToUpdate.PhoneNumber = stylist.PhoneNumber;
    stylistToUpdate.Email = stylist.Email;

    db.SaveChanges();
    return Results.NoContent();
});
app.Run();


