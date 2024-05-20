import { Button, Rows, Text } from "@canva/app-ui-kit";
import { addAudioTrack, addNativeElement } from "@canva/design";
import { upload } from "@canva/asset";
import * as React from "react";
import styles from "styles/components.css";

function logToPage(message) {
  const logElement = document.getElementById('log');
  if (logElement) {
    logElement.innerText += message + '\n';
  } else {
    const newLogElement = document.createElement('div');
    newLogElement.id = 'log';
    newLogElement.innerText = message + '\n';
    document.body.appendChild(newLogElement);
  }
}

export const App = () => {
  const onClick = async () => {
    console.log("Sanity??");
    addNativeElement({
      top: 10,
      left: 10,
      type: "TEXT",
      children: ["UGA BUGA GUGA world!"],
    });

    const marsStorage = process.env.MARS_STORAGE
    let result = await upload({
      type: "AUDIO",
      title: "DoomE1M1.mp3",
      url: `${marsStorage}/doom.mp3`,
      mimeType: "audio/mp3",
      durationMs: 100000,
    });

    await result.whenUploaded();
    logToPage(result.ref);

    await addAudioTrack({
      ref: result.ref
    });

  };

  return (
    <div className={styles.scrollContainer}>
      <Rows spacing="2u">
        <Text>
          To make changes to this app, edit the <code>src/app.tsx</code> file,
          then close and reopen the app in the editor to preview the changes.
        </Text>
        <Button variant="primary" onClick={onClick} stretch>
          Do something cool?
        </Button>
        <div id="log"></div>
      </Rows>
    </div>
  );
};
