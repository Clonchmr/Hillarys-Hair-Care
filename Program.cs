using HillarysHairCare.Models;
using HillarysHairCare.Models.DTOs;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Http.Json;
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

app.Run();


