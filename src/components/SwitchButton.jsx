import React, { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { useThemeSwitcher } from "react-css-theme-switcher";
import { Switch } from "antd";

const SwitchButton = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    JSON.parse(localStorage.getItem("isDarkMode"))
  );

  useEffect(() => {
    localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const { switcher, themes } = useThemeSwitcher();

  const switchTheme = () => {
    setIsDarkMode(!JSON.parse(localStorage.getItem("isDarkMode")));
    switcher({
      theme: JSON.parse(localStorage.getItem("isDarkMode"))
        ? themes.light
        : themes.dark,
    });
  };

  return (
    <Switch
      // defaultChecked
      unCheckedChildren={<FaMoon style={{ marginTop: "5px" }} />}
      checkedChildren={<FaSun style={{ marginTop: "5px" }} />}
      checked={isDarkMode}
      onChange={switchTheme}
    />
  );
};

export default SwitchButton;
