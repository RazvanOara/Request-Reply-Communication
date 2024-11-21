package com.example.demo.Controller;

import com.example.demo.Model.Device;
import com.example.demo.Service.DeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/devices")
public class DeviceController {

    @Autowired
    private DeviceService deviceService;

    // Create a new device
    @PostMapping
    public Device createDevice(@RequestBody Device device) {
        return deviceService.createDevice(device);
    }

    // Get all devices
    @GetMapping
    public List<Device> getAllDevices() {
        return deviceService.getAllDevices();
    }

    // Get a device by ID
    @GetMapping("/{id}")
    public ResponseEntity<Device> getDeviceById(@PathVariable Long id) {
        return deviceService.getDeviceById(id)
                .map(device -> ResponseEntity.ok().body(device))
                .orElse(ResponseEntity.notFound().build());
    }

    // Update a device
    @PutMapping("/{id}")
    public ResponseEntity<Device> updateDevice(@PathVariable Long id, @RequestBody Device deviceDetails) {
        Device updatedDevice = deviceService.updateDevice(id, deviceDetails);
        return ResponseEntity.ok(updatedDevice);
    }

    // Delete a device by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDevice(@PathVariable Long id) {
        deviceService.deleteDevice(id);
        return ResponseEntity.noContent().build();
    }

    // Delete devices by user ID
//    @DeleteMapping("/user/{userId}")
//    public ResponseEntity<Void> deleteDevicesByUserId(@PathVariable Long userId) {
//        deviceService.deleteDevicesByUserId(userId);
//        return ResponseEntity.noContent().build();
//    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Device>> getDevicesByUserId(@PathVariable Long userId) {
        List<Device> devices = deviceService.getDevicesByUserId(userId);
        if (devices.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(devices);
    }
}
