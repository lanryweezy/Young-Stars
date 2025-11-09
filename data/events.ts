export interface SchoolEvent {
  date: string;
  title: string;
  description: string;
  category: 'Academic' | 'Holiday' | 'Event' | 'Extracurricular';
}

export const events: SchoolEvent[] = [
  // --- Past Events for context ---
  {
    date: '2024-08-20',
    title: 'Staff Professional Development',
    description: 'All teaching staff to attend mandatory training for the new academic session.',
    category: 'Academic',
  },
  {
    date: '2024-09-02',
    title: 'First Day of School',
    description: 'Welcome back, Young Stars! The 2024/2025 academic session begins.',
    category: 'Academic',
  },

  // --- Upcoming Events ---
  {
    date: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0],
    title: 'Inter-House Sports Tryouts',
    description: 'Students interested in joining school sports teams should attend the tryouts.',
    category: 'Extracurricular',
  },
  {
    date: new Date(new Date().setDate(new Date().getDate() + 14)).toISOString().split('T')[0],
    title: 'Parent-Teacher Conference',
    description: 'An opportunity for parents to meet with teachers and discuss student progress for the first half of the term.',
    category: 'Academic',
  },
   {
    date: new Date(new Date().setDate(new Date().getDate() + 21)).toISOString().split('T')[0],
    title: 'Science & Tech Fair',
    description: 'Showcasing innovative projects from our young scientists and engineers.',
    category: 'Event',
  },
  {
    date: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split('T')[0],
    title: 'Mid-Term Break Begins',
    description: 'School closes for a short mid-term break. Classes resume next week.',
    category: 'Holiday',
  },
   {
    date: new Date(new Date().setMonth(new Date().getMonth() + 2)).toISOString().split('T')[0],
    title: 'Cultural Day Celebration',
    description: 'A vibrant celebration of diverse cultures with performances, food, and traditional attire.',
    category: 'Event',
  },
  {
    date: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().split('T')[0],
    title: 'First Term Examinations',
    description: 'Assessment week for all classes. We wish our students the best of luck!',
    category: 'Academic',
  },
  {
    date: new Date(new Date().setMonth(new Date().getMonth() + 4)).toISOString().split('T')[0],
    title: 'End of Term / Christmas Vacation',
    description: 'The first term comes to an end. Happy holidays to our entire school community!',
    category: 'Holiday',
  },
];
