// constants.tsx

export enum Page {
    Home = '/',
    About = '/about',
    Admissions = '/admissions',
    Gallery = '/gallery',
    News = '/news',
    NewsDetail = '/news/:id',
    Calendar = '/calendar',
    Contact = '/contact',
    StudentPortal = '/portals/student',
    ParentPortal = '/portals/parent',
    StaffPortal = '/portals/staff',
    AdminPortal = '/portals/admin',
    Portals = '/portals',
}

export const navLinks = [
    { name: 'Home', href: Page.Home, metaDescription: "Welcome to lanrystars, the best nursery and primary school in Ado Ekiti. Discover our future-ready curriculum, STEM focus, and nurturing environment for your child." },
    { name: 'About Us', href: Page.About, metaDescription: "Learn about lanrystars, the top-rated primary school in Ado Ekiti. Our mission, vision, and team of the best teachers committed to excellence." },
    { name: 'Admissions', href: Page.Admissions, metaDescription: "Apply to the best primary school in Ado Ekiti. Find details on admissions, fees, and how to join the most innovative school in Ekiti State." },
    { name: 'Gallery', href: Page.Gallery, metaDescription: "Explore life at the best primary school in Ado Ekiti. See our modern facilities and vibrant student activities at lanrystars." },
    { name: 'News', href: Page.News, metaDescription: "Latest updates from the most innovative primary school in Ado Ekiti. Read news and stories from lanrystars international school." },
    { name: 'Calendar', href: Page.Calendar, metaDescription: "Academic calendar for the best primary school in Ado Ekiti. Stay informed about key dates and events at lanrystars." },
    {
        name: 'Portals',
        href: Page.Portals,
        sublinks: [
            { name: 'Student Portal', href: '#', page: Page.StudentPortal, metaDescription: "Student portal for grades, assignments, and resources at lanrystars." },
            { name: 'Parent Portal', href: '#', page: Page.ParentPortal, metaDescription: "Parent portal to track your child's progress and school announcements at lanrystars." },
            { name: 'Staff Portal', href: '#', page: Page.StaffPortal, metaDescription: "Staff portal for resources, communication, and administrative tasks." },
            { name: 'Admin Portal', href: '#', page: Page.AdminPortal, metaDescription: "Administrative portal for managing school operations at lanrystars." },
        ],
        metaDescription: "Access the student, parent, staff, and admin portals for lanrystars, the most organized and efficient school in Ado Ekiti.",
    },
    { name: 'Contact Us', href: Page.Contact, metaDescription: "Contact lanrystars, the best school in Ado Ekiti. Find our address, phone number, and email for inquiries and visits." },
];
