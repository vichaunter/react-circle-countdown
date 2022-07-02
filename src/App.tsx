import CircleCountdownCss from "./components/CircleCountdownCss";
import CircleCountdownSvg from "./components/CircleCountdownSvg";

function App() {
  return (
    <div>
      <h2>Css styled countdown</h2>
      <CircleCountdownCss />
      <h2>Svg managed countdown</h2>
      <CircleCountdownSvg />
    </div>
  );
}

export default App;
