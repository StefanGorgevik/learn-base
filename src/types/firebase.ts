export interface StringValueProps {
  stringValue: string;
}

export interface ResponsePostProps {
  category: {
    stringValue: string;
  };
  description: {
    stringValue: string;
  };
  title: {
    stringValue: string;
  };
  contents: {
    stringValue: string;
  };
}
export interface PostsResponseProps {
  name: string;
  createTime: string;
  updateTime: string;
  fields: ResponsePostProps;
}
export interface SearchItemProps {
  title: string;
  id: string;
}

export interface ResponseTodoProps {
  category: {
    stringValue: string;
  };
  description: {
    stringValue: string;
  };
  title: {
    stringValue: string;
  };
  level: {
    stringValue: string;
  };
  completed: {
    booleanValue: boolean;
  };
}

export interface TodosResponseProps {
  name: string;
  createTime: string;
  updateTime: string;
  fields: ResponseTodoProps;
}
