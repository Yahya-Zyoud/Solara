"use client";

import { useMemo, useState, type FormEvent } from "react";
import { ArrowUpRight, Check, CheckCircle2, ChevronDown, Clock3, FileImage, Search, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { issueExamples, issueTypes, sampleTicket } from "./service.data";
import type { IssueReport, IssueType, TicketStatus } from "./service.types";
import SupportOrbit from "./SupportOrbit";
import styles from "./service.module.css";

const emptyForm: IssueReport = { name: "", email: "", site: "", issue: issueTypes[0], description: "" };
const easeOut = [0.22, 1, 0.36, 1] as const;

export default function ServiceExperience() {
  const reduceMotion = useReducedMotion();
  const [form, setForm] = useState<IssueReport>(emptyForm);
  const [submittedReference, setSubmittedReference] = useState<string | null>(null);
  const [ticketReference, setTicketReference] = useState(sampleTicket.reference);
  const [searchedReference, setSearchedReference] = useState("");
  const [attachmentName, setAttachmentName] = useState("");
  const [copied, setCopied] = useState(false);

  const ticket = useMemo<TicketStatus | undefined>(() => {
    if (!searchedReference) return undefined;
    if (submittedReference && searchedReference === submittedReference) {
      return {
        reference: submittedReference,
        status: "Request received",
        issue: form.issue,
        updated: "Just now",
        nextStep: "Your demo request has been added to this browser session. A support specialist would review it next.",
        progress: 0,
        events: [
          { title: "Request received", detail: "Your report has been recorded in this demo.", date: "Just now", complete: true },
          { title: "Under review", detail: "A specialist would check your system details.", date: "Upcoming", complete: false },
          { title: "Next step confirmed", detail: "You would receive an update here.", date: "Upcoming", complete: false },
          { title: "Resolved", detail: "The resolution would appear here.", date: "Upcoming", complete: false },
        ],
      };
    }
    return issueExamples[searchedReference.toUpperCase()];
  }, [form.issue, searchedReference, submittedReference]);

  function update<K extends keyof IssueReport>(key: K, value: IssueReport[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function submitIssue(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const reference = `SL-${crypto.randomUUID().slice(0, 4).toUpperCase()}`;
    setSubmittedReference(reference);
  }

  function trackTicket(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSearchedReference(ticketReference.trim().toUpperCase());
  }

  async function copyReference() {
    if (!submittedReference) return;
    try {
      await navigator.clipboard.writeText(submittedReference);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.65, ease: easeOut }}
        >
          <div className={styles.eyebrow}><span className={styles.eyebrowDot} />CARE THAT CONTINUES</div>
          <h1 className={styles.title}>Good energy.<br className={styles.mobileBreak} /> Ongoing support.</h1>
          <p className={styles.lede}>Tell us what’s happening. We’ll help you see the next step.</p>
        </motion.div>

        <div className={styles.contentGrid}>
          <motion.section
            className={styles.formSection}
            aria-labelledby="report-heading"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : 0.08, ease: easeOut }}
          >
            <AnimatePresence mode="wait" initial={false}>
            {submittedReference ? (
              <motion.div
                key="success"
                className={styles.successPanel}
                role="status"
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: reduceMotion ? 0 : 0.28, ease: easeOut }}
              >
                <div className={styles.successIcon}><CheckCircle2 size={25} strokeWidth={1.7} /></div>
                <p className={styles.sectionKicker}>REQUEST RECEIVED</p>
                <h2 id="report-heading" className={styles.successTitle}>Your next step starts here.</h2>
                <p className={styles.successText}>We’ve created a demo request reference. Keep it handy to check the sample status on this page.</p>
                <button className={styles.referenceButton} type="button" onClick={copyReference} aria-label="Copy request reference">
                  <span><small>YOUR REFERENCE</small><strong>{submittedReference}</strong></span>
                  <span className={styles.copyAction}>{copied ? <><Check size={16} /> Copied</> : <>Copy <ArrowUpRight size={15} /></>}</span>
                </button>
                <button className={styles.textButton} type="button" onClick={() => setSubmittedReference(null)}>Report another issue <ArrowUpRight size={15} /></button>
                <p className={styles.demoNote}>Demo only. This request has not been sent to a support team.</p>
              </motion.div>
            ) : (
              <motion.form
                key="report-form"
                className={styles.form}
                onSubmit={submitIssue}
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: reduceMotion ? 0 : 0.28, ease: easeOut }}
              >
                <div className={styles.sectionHeader}>
                  <h2 id="report-heading">Report an issue</h2>
                  <span className={styles.stepCount}>01 <i /> 03</span>
                </div>

                <div className={styles.fieldsGrid}>
                  <label className={styles.field}><span>Full name <b>*</b></span><input autoComplete="name" name="name" value={form.name} onChange={(event) => update("name", event.target.value)} placeholder="e.g. Alex Morgan" required /></label>
                  <label className={styles.field}><span>Email address <b>*</b></span><input autoComplete="email" type="email" name="email" value={form.email} onChange={(event) => update("email", event.target.value)} placeholder="you@example.com" required /></label>
                  <label className={styles.field}><span>Site or installation reference</span><input name="site" value={form.site} onChange={(event) => update("site", event.target.value)} placeholder="e.g. SL-1038 or home address" /></label>
                  <label className={`${styles.field} ${styles.selectField}`}><span>What can we help with? <b>*</b></span><span className={styles.selectWrap}><select name="issue" value={form.issue} onChange={(event) => update("issue", event.target.value as IssueType)}>{issueTypes.map((issue) => <option key={issue}>{issue}</option>)}</select><ChevronDown size={17} aria-hidden="true" /></span></label>
                </div>

                <label className={`${styles.field} ${styles.descriptionField}`}><span>Describe the issue <b>*</b></span><textarea name="description" value={form.description} onChange={(event) => update("description", event.target.value)} placeholder="When did it start? Any error messages or changes in output?" required rows={4} /></label>

                <div className={styles.uploadGroup}>
                  <span className={styles.uploadLabel}>Add a photo <small>(optional)</small></span>
                  <label className={styles.uploadBox}>
                    <input type="file" accept="image/*" onChange={(event) => setAttachmentName(event.target.files?.[0]?.name ?? "")} />
                    {attachmentName ? <><FileImage size={17} /><span className={styles.fileName}>{attachmentName}</span><button className={styles.removeFile} type="button" aria-label="Remove selected image" onClick={(event) => { event.preventDefault(); setAttachmentName(""); }}> <X size={15} /></button></> : <><span className={styles.uploadPick}>Choose file</span><span>No file chosen</span></>}
                  </label>
                  <p className={styles.uploadNote}>Image up to 10 MB. Demo attachment is not uploaded.</p>
                </div>

                <motion.button
                  className={styles.submitButton}
                  type="submit"
                  whileHover={reduceMotion ? undefined : { y: -2 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                >Submit maintenance request <ArrowUpRight size={17} /></motion.button>
                <p className={styles.demoNote}>Demo submission only. No maintenance visit is booked.</p>
              </motion.form>
            )}
            </AnimatePresence>
          </motion.section>

          <motion.aside
            className={styles.trackerCard}
            aria-labelledby="tracker-heading"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: reduceMotion ? 0 : 0.65, delay: reduceMotion ? 0 : 0.18, ease: easeOut }}
          >
            <SupportOrbit />
            <div className={styles.cardTopline}><span className={styles.cardMark} /><span>ALREADY IN OUR CARE?</span></div>
            <h2 id="tracker-heading">A clear view of<br />what happens next.</h2>
            <p className={styles.trackerIntro}>Follow your request from the first report to the final resolution.</p>
            <form className={styles.trackForm} onSubmit={trackTicket}>
              <label className={styles.srOnly} htmlFor="ticket-reference">Ticket reference</label>
              <input id="ticket-reference" value={ticketReference} onChange={(event) => setTicketReference(event.target.value)} placeholder="Enter your reference" aria-label="Ticket reference" required />
              <motion.button
                type="submit"
                aria-label="Track request"
                whileHover={reduceMotion ? undefined : { y: -2 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              >Track <ArrowUpRight size={17} /></motion.button>
            </form>
            <p className={styles.sampleHint}>Try the sample ticket <button type="button" onClick={() => { setTicketReference(sampleTicket.reference); setSearchedReference(sampleTicket.reference); }}>{sampleTicket.reference}</button>.</p>

            <AnimatePresence mode="wait" initial={false}>
            {searchedReference ? ticket ? (
              <motion.div
                key={`ticket-${ticket.reference}`}
                className={styles.ticketResult}
                aria-live="polite"
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: reduceMotion ? 0 : 0.32, ease: easeOut }}
              >
                <div className={styles.statusHeader}><span className={styles.statusPill}><span />{ticket.status}</span><span className={styles.updated}><Clock3 size={13} />{ticket.updated}</span></div>
                <p className={styles.ticketMeta}>{ticket.reference} <span>·</span> {ticket.issue}</p>
                <div className={styles.progressTrack} aria-label={`${ticket.progress + 1} of 4 steps complete`}>{ticket.events.map((event, index) => <span key={event.title} className={`${styles.progressStep} ${event.complete ? styles.progressComplete : ""}`}><i>{event.complete ? <Check size={10} /> : null}</i><b>{index + 1}</b></span>)}</div>
                <div className={styles.timeline}>{ticket.events.map((event, index) => <motion.div
                  className={`${styles.timelineEvent} ${event.complete ? styles.eventComplete : ""}`}
                  key={event.title}
                  initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.3, delay: reduceMotion ? 0 : index * 0.06, ease: easeOut }}
                >
                  <span className={styles.timelineMarker}>{event.complete ? <Check size={11} /> : <span />}</span><div className={styles.eventBody}><div className={styles.eventHeading}><strong>{event.title}</strong><time>{event.date}</time></div>{index === ticket.progress && <p>{event.detail}</p>}</div>
                </motion.div>)}</div>
                <div className={styles.nextStep}><span className={styles.nextIcon}><Clock3 size={15} /></span><p><strong>What happens next</strong>{ticket.nextStep}</p></div>
              </motion.div>
            ) : <motion.div
              key="not-found"
              className={styles.notFound}
              role="status"
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: reduceMotion ? 0 : 0.25, ease: easeOut }}
            ><Search size={17} /><p><strong>We couldn’t find that request.</strong><span>Check the reference and try again. Sample: SL-2048.</span></p></motion.div> : null}
            </AnimatePresence>

            <div className={styles.safetyNote}><p><strong>Smoke, fire or an electrical hazard?</strong> Keep clear and contact local emergency services. This form isn’t monitored for emergencies.</p></div>
          </motion.aside>
        </div>
      </div>
    </main>
  );
}
