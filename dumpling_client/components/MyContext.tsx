// MyContext.tsx
import React, { createContext, useState, ReactNode } from 'react';

interface MyContextProps {
  myValue: string;
  setMyValue: React.Dispatch<React.SetStateAction<string>>;
}

// 创建 Context，并定义默认值（这里的默认值不会实际使用，只是为了 TypeScript 的类型检查）
const MyContext = createContext<MyContextProps | undefined>(undefined);

// 创建 Provider 组件
export const MyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [myValue, setMyValue] = useState<string>('Some initial value');

  return (
    <MyContext.Provider value={{ myValue, setMyValue }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContext;
