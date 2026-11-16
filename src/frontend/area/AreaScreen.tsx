"use client";
import { NasaSuggestions } from "@/frontend/planner/NasaSuggestions";
import { CropHistory } from "./CropHistory";
import Link from "next/link";
import { useState } from "react";
import { ActionGroup } from "@/frontend/ui/ActionGroup";
import { AppFrame } from "@/frontend/journey/AppFrame";
import { CurrentCropSheet } from "@/frontend/journey/CommonSheets";
import { useFarm } from "@/frontend/state/FarmProvider";
import { Button } from "@/frontend/ui/Button";
import { Sheet } from "@/frontend/ui/Sheet";
import { CropBedArt } from "@/frontend/ui/CropBedArt";
import { ListenButton } from "@/frontend/audio/ListenButton";
import {
  AreaDetailsSchema,
  buildRecord,
  type FieldRecord,
  type FarmChange,
} from "@/shared/farm";
import { localDate, shortDate } from "@/shared/planning";
import styles from "./area.module.css";

export default function AreaScreen() {
  const { farm, ready, busy, changeFarm, message } = useFarm();
  const [panel, setPanel] = useState<"area" | "crop" | "options" | null>(null);
  const [editing, setEditing] = useState<FieldRecord | null>(null);
  const [removing, setRemoving] = useState<FarmChange | null>(null);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");
  async function save(change: FarmChange) {
    setError("");
    try {
      await changeFarm(change);
      setRemoving(null);
      setFeedback("Change saved on this device.");
    } catch {
      setError("Could not save. Try again.");
    }
  }
  return (
    <AppFrame>
      <header className={styles.heading}>
        <span className="eyebrow">YOUR GARDEN BED</span>
        <h1>
          My area<span>.</span>
        </h1>
        <p>What grows here and the story of each task.</p>
      </header>
      {!ready ? (
        <p role="status">Opening your records…</p>
      ) : (
        <>
          <section
            className={`${styles.card} ${styles.hero}`}
            aria-label="Current crop"
          >
            <span className="eyebrow">MY GARDEN BED</span>
            <CropBedArt crop={farm.currentCrop} />
            <p className={styles.areaName}>
              {farm.area?.name ?? "My garden bed"}
            </p>
            <h2>{farm.currentCrop ?? "Which crop is it?"}</h2>
            <p className={styles.meta}>
              Current crop
              {farm.exampleLoadedAt ? "· history with examples" : ""}
            </p>
            <ActionGroup>
              <Button variant="secondary" onClick={() => setPanel("crop")}>
                {farm.currentCrop ? "Change crop" : "Set current crop"}
              </Button>
              <Button variant="secondary" onClick={() => setPanel("options")}>
                What I usually grow
              </Button>
              <Link className="button button-secondary" id="next-cycles" href="/my-plan#next-crops">View my rotation</Link>
            </ActionGroup>
          </section>
          {farm.needsReview && (
            <p className="notice">
              Check the crop and review the plan. Your previous choice is still saved.
            </p>
          )}
          <section className={styles.card}>
            <details className={styles.areaDetails}>
              <summary>
                Bed details <span>{farm.area?.size || "Check"}</span>
              </summary>
              <div className={styles.detailsContent}>
                <p>
                  <strong>Name</strong>
                  <br />
                  {farm.area?.name ?? "Not provided yet"}
                </p>
                <p>
                  <strong>Size</strong>
                  <br />
                  {farm.area?.size || "Not provided"}
                </p>
                <p>
                  <strong>Water</strong>
                  <br />
                  {farm.area?.water || "Not provided"}
                </p>
                <p>
                  <strong>Soil</strong>
                  <br />
                  {farm.area?.soil || "Not provided"}
                </p>
                <p className={styles.meta}>
                  Area location not registered yet. Forecast: municipal reference for Mogi das Cruzes · SP.
                </p>
                <ActionGroup>
                  <Button variant="secondary" onClick={() => setPanel("area")}>
                    {farm.area ? "Edit details" : "Add details"}
                  </Button>
                </ActionGroup>
                {farm.area && (
                  <details className={styles.more}>
                    <summary>More options</summary>
                    <Button
                      variant="quiet"
                      onClick={() => setRemoving({ type: "area", area: null })}
                    >
                      Delete bed details
                    </Button>
                  </details>
                )}
              </div>
            </details>
          </section>
          <CropHistory farm={farm} onEdit={setEditing} onRemove={setRemoving} />
          <details className={styles.exampleTools}>
            <summary>Try it out</summary>
            <p className={styles.meta}>
              {farm.exampleLoadedAt
                ? "Demonstration history for tomato, carrot and lettuce. Your records have been preserved."
                : "Load eight months of examples to explore the history."}
            </p>
            {farm.exampleHistoryVersion < 2 && (
              <Button
                variant="secondary"
                disabled={busy}
                onClick={() =>
                  void save({
                    type: "load-example",
                    at: new Date().toISOString(),
                  })
                }
              >
                {farm.exampleLoadedAt ? "Complete demonstration" : "Load demonstration"}
              </Button>
            )}
          </details>
          <p className={styles.meta}>Saved on this device.</p>
        </>
      )}
      {(error || feedback || message) && (
        <p className="notice" role="status">
          {error || message || feedback}
        </p>
      )}
      {panel === "crop" && <CurrentCropSheet onClose={() => setPanel(null)} />}
      {panel === "area" && <AreaDetailsSheet onClose={() => setPanel(null)} />}
      {editing && (
        <EditRecordSheet record={editing} onClose={() => setEditing(null)} />
      )}
      {removing && (
        <Sheet
          title={
            removing.type === "area"
              ? "Delete these details?"
              : "Delete record?"
          }
          onClose={() => {
            setRemoving(null);
            setError("");
          }}
        >
          <p>
            {removing.type === "area"
              ? "Name, size, water and soil details will be deleted. Your crop, records and plan will stay saved."
              : "This record will be removed from the history, including the Home summary."}
          </p>
          <Button disabled={busy} onClick={() => void save(removing)}>
            Yes, delete
          </Button>
          <Button variant="quiet" onClick={() => setRemoving(null)}>
            Cancel
          </Button>
          {error && <p role="alert">{error}</p>}
        </Sheet>
      )}
      {panel === "options" && <Sheet title="What I usually grow" onClose={() => setPanel(null)}><NasaSuggestions optionsOnly /><Button onClick={() => setPanel(null)}>Done</Button></Sheet>}
    </AppFrame>
  );
}

function AreaDetailsSheet({ onClose }: { onClose: () => void }) {
  const { farm, changeFarm, busy } = useFarm();
  const [name, setName] = useState(farm.area?.name ?? "My garden bed");
  const [size, setSize] = useState(farm.area?.size ?? "");
  const [water, setWater] = useState(farm.area?.water ?? "");
  const [soil, setSoil] = useState(farm.area?.soil ?? "");
  const [confirm, setConfirm] = useState(false);
  const [error, setError] = useState("");
  async function save() {
    try {
      await changeFarm({
        type: "area",
        area: AreaDetailsSchema.parse({
          name,
          size,
          water,
          soil,
          updatedAt: new Date().toISOString(),
        }),
      });
      onClose();
    } catch {
      setError("Could not save. Check the name and try again.");
    }
  }
  return (
    <Sheet
      title={confirm ? "Check your details" : "Bed details"}
      onClose={onClose}
    >
      {confirm ? (
        <>
          <h3>{name}</h3>
          <p>Size: {size || "Not provided"}</p>
          <p>Water: {water || "Not provided"}</p>
          <p>Soil: {soil || "Not provided"}</p>
          <ListenButton
            text={`${name}. Size: ${size || "not provided"}. Water: ${water || "not provided"}. Soil: ${soil || "not provided"}. Confirm to save.`}
          />
          <Button disabled={busy} onClick={() => void save()}>
            Yes, save
          </Button>
          <Button variant="quiet" onClick={() => setConfirm(false)}>
            Correct
          </Button>
        </>
      ) : (
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            setConfirm(true);
          }}
        >
          <label>
            What do you call this area?
            <input
              required
              maxLength={60}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            How big is it? (optional)
            <input
              maxLength={40}
              placeholder="E.g. 20 m²"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />
          </label>
          <details>
            <summary>Add water and soil details (optional)</summary>
            <label>
              What do you know about the water?
              <textarea
                maxLength={300}
                value={water}
                onChange={(e) => setWater(e.target.value)}
              />
            </label>
            <label>
              What do you know about the soil?
              <textarea
                maxLength={300}
                value={soil}
                onChange={(e) => setSoil(e.target.value)}
              />
            </label>
          </details>
          <p className={styles.meta}>If you don’t know, leave it blank.</p>
          <Button type="submit" disabled={!name.trim()}>
            Check
          </Button>
        </form>
      )}
      {error && <p role="alert">{error}</p>}
    </Sheet>
  );
}

function EditRecordSheet({
  record,
  onClose,
}: {
  record: FieldRecord;
  onClose: () => void;
}) {
  const { changeFarm, busy } = useFarm();
  const [action, setAction] = useState(record.action);
  const [crop, setCrop] = useState(record.crop);
  const [date, setDate] = useState(record.date);
  const [confirm, setConfirm] = useState(false);
  const [error, setError] = useState("");
  async function save() {
    try {
      const valid = buildRecord(action, crop, date);
      await changeFarm({
        type: "edit-record",
        record: { ...valid, id: record.id, reportedAt: record.reportedAt },
      });
      onClose();
    } catch {
      setError("Could not save. Check the date and try again.");
    }
  }
  return (
    <Sheet
      title={confirm ? "Confirm correction?" : "Correct record"}
      onClose={onClose}
    >
      {confirm ? (
        <>
          <CropBedArt crop={crop} />
          <h3>
            {action} · {crop}
          </h3>
          <p>{shortDate(date)}</p>
          <ListenButton
            text={`Change to: ${action}, ${crop}, ${shortDate(date)}.`}
          />
          <Button disabled={busy} onClick={() => void save()}>
            Yes, correct
          </Button>
          <Button variant="quiet" onClick={() => setConfirm(false)}>
            Back
          </Button>
        </>
      ) : (
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            setConfirm(true);
          }}
        >
          <label>
            What happened?
            <select
              value={action}
              onChange={(e) =>
                setAction(e.target.value as FieldRecord["action"])
              }
            >
              {["Planted", "Watered", "Harvested"].map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          </label>
          <label>
            Which crop?
            <select
              value={crop}
              onChange={(e) => setCrop(e.target.value as FieldRecord["crop"])}
            >
              {["Lettuce", "Carrot", "Tomato"].map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          </label>
          <label>
            When was it?
            <input
              type="date"
              required
              max={localDate(new Date())}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
          <Button type="submit">Check</Button>
        </form>
      )}
      {error && <p role="alert">{error}</p>}
    </Sheet>
  );
}