enum DocumentationSection {
    description = 'description',
    authentification = 'authentification',
    resources = 'resources',
    rights = 'rights'
}

type LoaderType = 
    'circle'
    | 'dots'
    | 'rebound'
    | 'gauge'
;

type HttpVerb =
    'get'
    | 'post'
    | 'delete'
    | 'put'
    | 'patch'
    | 'options'
    | 'head'
;

export type {
    LoaderType,
    HttpVerb,
};

export { DocumentationSection };