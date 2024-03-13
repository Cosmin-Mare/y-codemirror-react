import * as Y from "yjs";
import { CodemirrorBinding } from "y-codemirror";
import { WebrtcProvider } from "y-webrtc";
import CodeMirror from "codemirror";
import { useEffect, useState } from "react";
import short from "short-uuid";
import { useParams, useHistory } from "react-router-dom";
import "codemirror/mode/javascript/javascript.js";
import "codemirror/addon/mode/simple.js";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material-darker.css";
import { randomHex } from "randomize-hex";

const Editor = () => {
  const [name, setName] = useState("Name");
  const [color, setColor] = useState("#008833");
  let history = useHistory();
  let { id } = useParams();
  console.log(id);
  const connect = (room) => {
    try {
      const ydoc = new Y.Doc();
      const provider = new WebrtcProvider(room, ydoc);
      const yText = ydoc.getText("codemirror");
      const yUndoManager = new Y.UndoManager(yText);

      const e = new CodeMirror(document.getElementById("editor"), {
        mode: "simplemode",
        lineNumbers: true,
        theme: "material-darker",
      });
      window.binding = new CodemirrorBinding(yText, e, provider.awareness, {
        yUndoManager,
      });
      console.log("connect to", room);
      window.binding.awareness.setLocalStateField("user", {
        color: color,
        name: name,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const copy = () => {
    var copyText = document.getElementById("myInput");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    alert("Link copied!");
  };

  const newRoom = () => {
    let uuid = short.generate();
    // connect(uuid);
    history.push(uuid);
  };

  useEffect(() => {
    if (id) {
      connect(id);
    }
    console.log("effect");
  }, [id]);
  return (
    <div>
      {id ? (
        <>
          <p style={{ display: "inline" }}>
            You have connected to a shared editor. You can share this link to
            more collaboraters:
          </p>
          <input
            readOnly
            type="text"
            value={`http://localhost:3000/${id}`}
            size="50"
            id="myInput"
          />
          <button onClick={copy}>copy</button> <br />
          <p style={{ color: "red" }}>
            btw you can change the localhost to your local ip address(ex:
            192.123.4.567) to access this from other devices, but be sure to
            include the :3000 port
          </p>
          <br />
          <p style={{ display: "inline" }}>You can rename yourself here: </p>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              window.binding.awareness.setLocalStateField("user", {
                color: "#008833",
                name: e.target.value,
              });
            }}
            size="15"
            id="name"
          />
          <button
            style={{ backgroundColor: color }}
            onClick={() => {
              let c = randomHex();
              setColor(c);
              window.binding.awareness.setLocalStateField("user", {
                color: c,
                name: name,
              });
            }}
          >
            Change a color
          </button>
        </>
      ) : (
        <div className="m-10">
          <ol>
            <li>Click new</li>
            <li>Copy the generated URL</li>
            <li>Share it or open another window to test collaboration!</li>
          </ol>
          <button
            className="hover:bg-indigo-200 bg-indigo-300 text-yellow-800 shadow rounded py-1 px-5"
            onClick={newRoom}
          >
            new
          </button>
        </div>
      )}
      <div id="editor"></div>
    </div>
  );
};

export default Editor;
