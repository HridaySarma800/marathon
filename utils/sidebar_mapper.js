const getSidebar = (role) => {
  let data = [];

  if (role === CURRENT_ROLE.ADMIN || role === CURRENT_ROLE.DIRECTOR) {
    data.push({
      sectionTitle: "Admin",
      sectionData: [
        {
          title: "Dashboard",
          route: "/dashboard",
          hasChild: false,
          children: [],
        },
        {
          title: "Outlets",
          route: "/outlets",
          hasChild: false,
          children: [],
        },
        {
          title: "Clients",
          route: "/clients",
          hasChild: false,
          children: [],
        },
        {
          title: "Staffs",
          route: "/staffs",
          hasChild: false,
          children: [],
        },
        {
          title: "Users",
          route: "/users",
          hasChild: true,
          children: [
            {
              title: "User Analytics",
              route: "/users/analytics",
              hasChild: false,
              children: [],
            },
          ],
        },
        {
          title: "Orders",
          route: "/orders",
          hasChild: false,
          children: [],
        },
        {
          title: "Coupons",
          route: "/coupons",
          hasChild: false,
          children: [],
        },
        {
          title: "Payment",
          route: "/payment",
          hasChild: false,
          children: [],
        },
        {
          title: "Customer Queries",
          route: "/customer-queries",
          hasChild: false,
          children: [],
        },
        {
          title: "Ratings & Reviews",
          route: "/ratings-reviews",
          hasChild: false,
          children: [],
        },
        {
          title: "Chat",
          route: "/chat",
          hasChild: false,
          children: [],
        },
      ],
    });
  }

  if (
    role === CURRENT_ROLE.ADMIN ||
    role === CURRENT_ROLE.MANAGER ||
    role === CURRENT_ROLE.DIRECTOR
  ) {
    data.push({
      sectionTitle: "Manage",
      sectionData: [
        {
          title: "Products",
          route: "/products",
          hasChild: true,
          children: [],
        },
        {
          title: "Categories",
          route: "/categories",
          hasChild: false,
          children: [],
        },
      ],
    });
  }

  data.push({
    sectionTitle: "Account",
    sectionData: [
      {
        title: "Settings",
        route: "/account/settings",
        hasChild: false,
        children: [],
      },
      {
        title: "Logout",
        route: "/account/logout",
        hasChild: false,
        children: [],
      },
    ],
  });

  return { data };
};
