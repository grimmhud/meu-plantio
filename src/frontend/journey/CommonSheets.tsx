"use client";
import { useState } from "react";
import { CalendarDays, Check, CircleHelp, Phone, Sprout } from "lucide-react";
import { useFarm } from "@/frontend/state/FarmProvider";
import { AREA, localDate, shortDate, type Crop } from "@/shared/planning";
import { buildRecord, type FieldRecord } from "@/shared/farm";
import { ListenButton } from "@/frontend/audio/ListenButton";
import { Button } from "@/frontend/ui/Button";
import { Sheet } from "@/frontend/ui/Sheet";
import { ActivityArt, CropArt } from "@/frontend/ui/Illustration";

export function CurrentCropSheet({ onClose }: { onClose: () => void }) {
  const { farm, changeFarm, busy, ready } = useFarm();
  const [crop, setCrop] = useState<Crop | null>(farm.currentCrop);
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState("");
  async function save() {
    try {
      await changeFarm({ type: "crop", crop, at: new Date().toISOString() });
      onClose();
    } catch {
      setError("Could not save. Try again.");
    }
  }
  return (
    <Sheet
      title={confirming ? "Is this the crop?" : "What is planted?"}
      onClose={onClose}
    >
      {confirming ? (
        <>
          <div className="large-crop">
            {crop ? <CropArt crop={crop} /> : <CircleHelp size={60} />}
            <h3>{crop ?? "I don’t know"}</h3>
          </div>
          <ListenButton
            text={`You reported that the current crop is ${crop ?? "unknown"}. This information does not record new planting. Confirm to save or go back to correct.`}
          />
          <Button disabled={busy || !ready} onClick={() => void save()}>
            {busy ? "Saving…" : "Yes, save"}
            <Check size={20} />
          </Button>
          <Button variant="quiet" onClick={() => setConfirming(false)}>
            Correct
          </Button>
        </>
      ) : (
        <>
          <div className="crop-picker">
            {(["Lettuce", "Carrot", "Tomato"] as Crop[]).map((item) => (
              <button
                key={item}
                aria-pressed={crop === item}
                onClick={() => {
                  setCrop(item);
                  setConfirming(true);
                }}
              >
                <CropArt crop={item} />
                <strong>{item}</strong>
                {crop === item && <Check size={20} />}
              </button>
            ))}
          </div>
          <Button
            variant="quiet"
            onClick={() => {
              setCrop(null);
              setConfirming(true);
            }}
          >
            <CircleHelp size={20} /> I don’t know
          </Button>
          <ListenButton text="What is planted in the bed today? Tap the picture: lettuce, carrot or tomato. If you don’t know, tap I don’t know." />
          <p className="sheet-note">
            Mogi das Cruzes · municipal reference.
          </p>
        </>
      )}
      {error && (
        <p className="notice" role="status">
          {error}
        </p>
      )}
    </Sheet>
  );
}

export function CallSheet({ onClose }: { onClose: () => void }) {
  return (
    <Sheet title="Call" onClose={onClose}>
      <div className="phone-emblem">
        <Phone size={38} />
      </div>
      <h3 className="call-title">Calling not available yet</h3>
      <p className="sheet-note">
        Phone conversations are not available yet.
      </p>
      <ListenButton text="Calling is not available yet. No call has been made. You can listen to the guidance on screen." />
      <Button variant="secondary" onClick={onClose}>
        Back
      </Button>
    </Sheet>
  );
}

export function HelpSheet({ onClose }: { onClose: () => void }) {
  return (
    <Sheet title="One step at a time" onClose={onClose}>
      <ol className="help-steps">
        <li>
          <Sprout />
          <span>Look at the bed.</span>
        </li>
        <li>
          <CalendarDays />
          <span>Plan the next step.</span>
        </li>
        <li>
          <Check />
          <span>Tell us what you did.</span>
        </li>
      </ol>
      <ListenButton text="On Home, see what to check today. In planning, choose the next crop and check the weather. In My plan, see your saved day and tell us what you did. Listen reads the guidance. You can go back and correct." />
      <details className="install-help">
        <summary>Add to home screen</summary>
        <p>
          In Chrome: menu, Install. On iPhone: Share, Add to Home Screen.
        </p>
        <p>
          Records stay on this device. Installing does not download the entire screen for offline use.
        </p>
      </details>
    </Sheet>
  );
}

export function RecordSheet({ onClose }: { onClose: () => void }) {
  const { farm, changeFarm, busy, ready, now } = useFarm();
  const [step, setStep] = useState(0);
  const [action, setAction] = useState<FieldRecord["action"]>("Planted");
  const [crop, setCrop] = useState<Crop>(farm.currentCrop ?? "Lettuce");
  const today = localDate(now ?? new Date());
  const yesterdayDate = new Date(`${today}T12:00:00Z`);
  yesterdayDate.setUTCDate(yesterdayDate.getUTCDate() - 1);
  const yesterday = yesterdayDate.toISOString().slice(0, 10);
  const [date, setDate] = useState(today);
  const [otherDate, setOtherDate] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  async function save() {
    setError("");
    try {
      await changeFarm({
        type: "record",
        record: buildRecord(action, crop, date),
      });
      setDone(true);
    } catch (error) {
      setError(
        error instanceof Error && error.message.includes("still in the future")
          ? error.message
          : "Could not save. Try again.",
      );
    }
  }
  const titles = [
    "What did you do?",
    "Which crop?",
    "When was it?",
    "Is this correct?",
  ];
  if (!farm.currentCrop) return <CurrentCropSheet onClose={onClose} />;
  return (
    <Sheet title={done ? "Recorded" : titles[step]} onClose={onClose}>
      {done ? (
        <>
          <div className="large-crop">
            <ActivityArt action={action} />
            <h3>
              {action} · {crop}
            </h3>
            <p>{shortDate(date)}</p>
          </div>
          <p className="sheet-note">
            {action === "Planted"
              ? "Now check the crop and plan."
              : "Saved in your records."}
          </p>
          <ListenButton
            text={`You reported: ${action}, ${crop}, ${shortDate(date)}. ${action === "Planted" ? "Check the crop and review your plan. Your previous choice has been preserved." : action === "Watered" ? "This records watering without calculating the amount of water." : "Harvesting does not automatically end the crop."}`}
          />
          <Button onClick={onClose}>Close</Button>
        </>
      ) : (
        <>
          {step !== 1 && <div className="flow-progress" aria-label={`Step ${[0,2,3].indexOf(step)+1} of 3`}>
            {[0, 2, 3].map((i) => (
              <span key={i} className={i <= step ? "active" : ""} />
            ))}
          </div>}
          {step === 0 && (
            <div className="activity-picker">
              {(["Planted", "Watered", "Harvested"] as const).map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setAction(item);
                    setStep(2);
                  }}
                >
                  <ActivityArt action={item} />
                  <strong>{item}</strong>
                </button>
              ))}
            </div>
          )}
          {step === 1 && (
            <div className="crop-picker">
              {(["Lettuce", "Carrot", "Tomato"] as Crop[]).map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setCrop(item);
                    setStep(3);
                  }}
                >
                  <CropArt crop={item} />
                  <strong>{item}</strong>
                </button>
              ))}
            </div>
          )}
          {step === 2 && (
            <>
              <div className="date-picker">
                <button
                  onClick={() => {
                    setDate(today);
                    setStep(3);
                  }}
                >
                  <CalendarDays />
                  <strong>Today</strong>
                  <span>{shortDate(today)}</span>
                </button>
                <button
                  onClick={() => {
                    setDate(yesterday);
                    setStep(3);
                  }}
                >
                  <CalendarDays />
                  <strong>Yesterday</strong>
                  <span>{shortDate(yesterday)}</span>
                </button>
              </div>
              <Button variant="quiet" onClick={() => setOtherDate(true)}>
                Another day
              </Button>
              {otherDate && (
                <div className="other-date">
                  <label htmlFor="record-date">Which day?</label>
                  <input
                    id="record-date"
                    type="date"
                    max={today}
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                  />
                  <Button
                    variant="secondary"
                    onClick={() =>
                      date && date <= today
                        ? setStep(3)
                        : setError("Check the date.")
                    }
                  >
                    Continue
                  </Button>
                </div>
              )}
            </>
          )}
          {step === 3 && (
            <>
              <div className="record-confirm">
                <ActivityArt action={action} />
                <CropArt crop={crop} />
              </div>
              <h3 className="confirm-title">
                {action} · {crop}
              </h3>
              <p className="confirm-date">{shortDate(date)}</p>
              <p className="quiet-caption">
                {farm.area?.name ?? "My garden bed"}
              </p>
              <Button variant="quiet" onClick={() => setStep(1)}>Correct crop</Button>
            </>
          )}
          <ListenButton
            text={
              step === 0
                ? "What did you do? Planted, watered or harvested. Tap a picture."
                : step === 1
                  ? "Which crop? Lettuce, carrot or tomato?"
                  : step === 2
                    ? "When was it? Today, yesterday or another day?"
                    : `You reported: ${action}, ${crop}, on ${shortDate(date)}, in ${farm.area?.name ?? "My garden bed"}. Confirm or go back to correct.`
            }
          />
          {step === 3 && (
            <Button disabled={busy || !ready} onClick={() => void save()}>
              {busy ? "Saving…" : "Yes, record"}
              <Check size={20} />
            </Button>
          )}
          {step > 0 && (
            <Button
              variant="quiet"
              onClick={() => {
                setStep(step === 1 ? 3 : step === 2 ? 0 : 2);
                setError("");
              }}
            >
              Back
            </Button>
          )}
        </>
      )}
      {error && (
        <p className="notice" role="status">
          {error}
        </p>
      )}
    </Sheet>
  );
}
