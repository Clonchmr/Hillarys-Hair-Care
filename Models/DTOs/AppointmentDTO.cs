namespace HillarysHairCare.Models.DTOs;

public class AppointmentDTO
{
    public int Id { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime 
    {
        get
        {
            return StartTime.AddHours(1);
        }
    }
    public int StylistId { get; set; }
    public StylistDTO Stylist { get; set; }
    public int CustomerId { get; set; }
    public CustomerDTO Customer { get; set; }
    public List<ServiceDTO> Services { get; set; } = new List<ServiceDTO>();
    public decimal TotalCost 
    {
        get
        {
           return Services.Sum(s => s.Price);
        }
    }
}