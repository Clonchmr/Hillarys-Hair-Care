using System.ComponentModel.DataAnnotations;

namespace HillarysHairCare.Models.DTOs;

public class ServiceDTO
{
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
    public decimal Price { get; set; }
    public List<AppointmentDTO> Appointments { get; set; } = new List<AppointmentDTO>();
}