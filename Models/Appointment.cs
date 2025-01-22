namespace HillarysHairCare.Models;

public class Appointment
{
    public int Id { get; set; }
    public DateTime StartTime { get; set ;}
    public DateTime EndTime 
    {
        get 
        {
            return StartTime.AddHours(1);
        }
    }
    public int StylistId { get; set; }
    public Stylist Stylist { get; set; }
    public int CustomerId { get; set; }
    public Customer Customer { get; set; }
    public List<Service> Services { get; set; } = new List<Service>();
    public decimal TotalCost
    {
        get
        {
            return Services.Sum(s => s.Price);
        }
    }
}