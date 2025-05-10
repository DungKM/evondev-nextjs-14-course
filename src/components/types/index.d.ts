type TActiveLinkProps = {
    url: string;
    children?: React.ReactNode;
}
type TMenuItem = {
    url: string;    
    title: string;
    icon: React.ReactNode;
}
type TCreateUserParams = {
    clerkId: string;
    username: string;
    email: string;
    name?: string;
    avatar?: string;
}

type TCreateCourseParams = {
    title: string;
    slug: string;
}
export {
    TActiveLinkProps,
    TMenuItem,
    TCreateUserParams,
    TCreateCourseParams
}
