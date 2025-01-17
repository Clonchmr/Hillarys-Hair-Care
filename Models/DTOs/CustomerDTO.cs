using System.ComponentModel.DataAnnotations;

namespace HillarysHairCare.Models.DTOs;

public class CustomerDTO
{
    public int Id { get; set; }
    [Required]
    public string FirstName { get; set; }
    [Required]
    public string LastName { get; set; }
    [Required]
    public string PhoneNumber { get; set; }
    [Required]
    public string Email { get; set; }
    public List<AppointmentDTO> Appointments { get; set; } = new List<AppointmentDTO>();
}