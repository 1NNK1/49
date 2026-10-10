import React from 'react';
import './shell.css';

// Оболочка показывает, что демонстрирует проект, и оборачивает рабочее приложение.
const INFO = {
  number: 49,
  title: "Тестирование асинхронного компонента",
  description: "UserProfile загружает данные и показывает три состояния: загрузка, успех, ошибка. Для них написаны тесты Vitest.",
  shows: ["Состояния loading / success / error", "Тесты в UserProfile.test.jsx с мокированием fetch"],
  how: ["Запустите тесты командой npm test"],
  files: "src/\n├── components/\n│   ├── UserProfile.jsx\n│   └── UserProfile.test.jsx\n├── shell/\n│   ├── DemoShell.jsx\n│   └── shell.css\n├── App.jsx\n├── index.css\n├── main.jsx\n└── setupTests.js",
};

const DemoShell = ({ children }) => (
  <div className="shell">
    <header className="shell-header">
      <p className="shell-tag">ДЗ {INFO.number}</p>
      <h1 className="shell-title">{INFO.title}</h1>
      <p className="shell-description">{INFO.description}</p>
    </header>

    <div className="shell-info">
      <section className="shell-box">
        <h2>Что показывает</h2>
        <ul>
          {INFO.shows.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <section className="shell-box">
        <h2>Как проверить</h2>
        <ul>
          {INFO.how.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </div>

    <h2 className="shell-section-title">Работа приложения</h2>
    <main className="shell-stage">{children}</main>

    <h2 className="shell-section-title">Структура src</h2>
    <pre className="shell-files">{INFO.files}</pre>
  </div>
);

export default DemoShell;
