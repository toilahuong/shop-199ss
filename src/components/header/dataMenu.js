import { CLIENT } from "../../config";

export const dataMenu = [
    {
        label: "Trang chủ",
        url: CLIENT+"/",
        level: 1,
        hasChildren: false,
    },
    {
        label: "Giới thiệu",
        url: CLIENT+"/page/gioi-thieu",
        level: 1,
        hasChildren: false,
    },
    {
        label: "Áo",
        url: CLIENT+"/san-pham/ao",
        level: 1,
        hasChildren: true,
        childrens: [
            {
                label: "T-shirt",
                url: CLIENT+"/san-pham/t-shirt",
                hasChildren: true,
                level: 2,
                childrens: [
                    {
                        label: "T-shirt 1",
                        url: CLIENT+"/san-pham/t-shirt",
                        level: 3,
                        hasChildren: true,
                        childrens: [
                            {
                                label: "T-shirt 1-1",
                                url: CLIENT+"/san-pham/t-shirt",
                                level: 4,
                                hasChildren: false,
                            },
                            {
                                label: "T-shirt 2-1",
                                url: CLIENT+"/san-pham/shirt",
                                level: 4,
                                hasChildren: false,
                            }
                        ]
                    },
                    {
                        label: "T-shirt 2",
                        url: CLIENT+"/san-pham/shirt",
                        level: 3,
                        hasChildren: false,
                    }
                ]
            },
            {
                label: "shirt",
                url: CLIENT+"/san-pham/shirt",
                level: 2,
                hasChildren: true,
                childrens: [
                    {
                        label: "T-shirt 1",
                        url: CLIENT+"/san-pham/t-shirt",
                        level: 3,
                        hasChildren: true,
                        childrens: [
                            {
                                label: "T-shirt 1-1",
                                url: CLIENT+"/san-pham/t-shirt",
                                level: 4,
                                hasChildren: false,
                            },
                            {
                                label: "T-shirt 2-1",
                                url: CLIENT+"/san-pham/shirt",
                                level: 4,
                                hasChildren: false,
                            }
                        ]
                    },
                    {
                        label: "T-shirt 2",
                        url: CLIENT+"/san-pham/shirt",
                        level: 3,
                        hasChildren: false,
                    }
                ]
            }
        ]
    },
    {
        label: "Quần",
        url: CLIENT+"/san-pham/quan",
        level: 1,
        hasChildren: false,
    },
    {
        label: "Giày/ dép",
        url: CLIENT+"/san-pham/phu-kien",
        level: 1,
        hasChildren: false,
    },
    {
        label: "Phụ kiện",
        url: CLIENT+"/san-pham/phu-kien",
        level: 1,
        hasChildren: false,
    },
    {
        label: "Tin tức",
        url: CLIENT+"/tin-tuc",
        level: 1,
        hasChildren: false,
    }
]