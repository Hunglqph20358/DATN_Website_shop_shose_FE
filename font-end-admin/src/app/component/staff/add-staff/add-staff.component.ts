import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.css']
})
export class AddStaffComponent implements OnInit {
  defaultImagePath = 'path/to/default-image.jpg';
  selectedImage: string = this.defaultImagePath;

  onAddImageClick() {
    document.getElementById('profilePicture').click();
  }

  onResetImageClick() {
    document.getElementById('profilePicture')['value'] = '';
    // Đặt ảnh mặc định
    this.selectedImage = this.defaultImagePath;
  }

  onImageChange(event: any) {
    const input = event.target;
    const reader = new FileReader();

    reader.onload = () => {
      this.selectedImage = reader.result as string;
    };

    reader.readAsDataURL(input.files[0]);
  }
  constructor() { }

  ngOnInit(): void {
  }

}
