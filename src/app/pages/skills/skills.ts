import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../core/services/project.service';
import { IconComponent } from '../../shared/components/icon/icon';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './skills.html',
  styleUrl: './skills.css'
})
export class Skills {
  // Inject the service to control the filter
  private projectService = inject(ProjectService);
  
  // Access the service's array signal (remember that in the service it must be called selectedFilters)
  protected activeFilters = this.projectService.selectedFilters;

  // List of core skills
  protected skillList = [
    'Angular', 'TypeScript', 'Python', 'Java', 'Kotlin', 'MySQL', 'NodeJS', 'ShellScript', 'CSS', 'HTML', 'TailwindCSS'
  ];

  // Function to toggle multiple filters
  toggleFilter(tech: string) {
    const currentFilters = this.activeFilters();
    
    // Check if the technology is already selected (ignoring case)
    const isSelected = currentFilters.some(
      (filter) => filter.toLowerCase() === tech.toLowerCase()
    );

    if (isSelected) {
      // If already selected, remove it from the array
      this.projectService.selectedFilters.set(
        currentFilters.filter((filter) => filter.toLowerCase() !== tech.toLowerCase())
      );
    } else {
      // If not selected, create a new array with the existing ones + the new one
      this.projectService.selectedFilters.set([...currentFilters, tech]);
    }
  }
}