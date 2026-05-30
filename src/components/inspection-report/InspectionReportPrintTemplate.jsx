import React, { forwardRef } from "react";

// ── Company info (Testtrue) ─────────────────────────────────────────────────
const COMPANY_TH =
  "บริษัท เทส ทรู จำกัด 64/1 หมู่ที่ 2 แขวงลำต้อยติ่ง เขตหนองจอก กรุงเทพมหานคร 10530 เลขประจำตัวผู้เสียภาษี 0105566123472";
const COMPANY_EN =
  "Test True Company Limited 64/1 Moo 2, Lam Toi Ting Subdistrict, Nong Chok, Bangkok 10530 Tax Registration Number 0105566123472";
const COMPANY_CONTACT =
  "E-Mail: testtrueservice@gmail.com , Website: https://testtrueservice.com";

// ── Palette (matches existing ReportPrintTemplate) ─────────────────────────
const borderColor = "#5e6066";
const reportBlue = "#242a8f";
const softBlueFill = "#eceef9";
const highlightYellow = "#fff3b8";
const reportEmerald = "#065f46";
const softEmeraldFill = "#d1fae5";

// ── Helpers ────────────────────────────────────────────────────────────────
function fmt(v) {
  const value = String(v || "").trim();
  return value || "—";
}

function fmtDateToDMY(dString) {
  if (!dString) return "..../..../........";
  const parts = dString.split("T")[0].split("-");
  if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0]}`;
  return dString;
}

// ── Shared sub-renders ─────────────────────────────────────────────────────
function renderCompanyFooter() {
  return (
    <div style={styles.companyFooter}>
      {COMPANY_TH}
      <br />
      {COMPANY_EN}
      <br />
      {COMPANY_CONTACT}
    </div>
  );
}

function renderPageNumber(pageNumber, totalPages) {
  return (
    <div style={styles.pageNumber}>
      หน้า: {pageNumber}/{totalPages}
    </div>
  );
}

function renderPageShell(content, pageNumber, totalPages, breakAfter = false) {
  return (
    <div
      style={{
        ...styles.page,
        ...(breakAfter ? { pageBreakAfter: "always", breakAfter: "page" } : {}),
      }}
    >
      <div style={{ flex: "1 1 auto" }}>{content}</div>
      {renderCompanyFooter()}
      {renderPageNumber(pageNumber, totalPages)}
    </div>
  );
}

function renderHeader(reportTitle, reportSubtitle, sigDateStr, codeNo, accentColor) {
  return (
    <>
      {/* Brand row */}
      <div style={styles.topBrandRow}>
        <img src="/img/Logo.jpg" alt="Logo" style={styles.logo} />
        <div style={styles.qrWrap}>
          <img src="/img/qrline.jpg" alt="QR" style={styles.qrCode} />
        </div>
      </div>

      {/* Title table */}
      <table style={styles.titleTable}>
        <tbody>
          <tr>
            <td
              colSpan="4"
              style={{ ...styles.titleCell, background: accentColor }}
            >
              {reportTitle}
            </td>
          </tr>
          <tr>
            <td style={styles.metaLabelCell}>CODE NO.</td>
            <td style={styles.metaValueCell}>{fmt(codeNo)}</td>
            <td style={styles.metaLabelCell}>DATE:</td>
            <td style={styles.metaValueCell}>{sigDateStr}</td>
          </tr>
        </tbody>
      </table>

      {reportSubtitle && (
        <div style={{ ...styles.reportSubtitle, borderLeftColor: accentColor }}>
          {reportSubtitle}
        </div>
      )}
    </>
  );
}

function renderSectionHeader(title, engTitle, accentColor) {
  return (
    <div
      style={{
        ...styles.sectionHeader,
        borderLeftColor: accentColor,
        background: highlightYellow,
      }}
    >
      {title}
      {engTitle ? ` / ${engTitle}` : ""}
    </div>
  );
}

function renderInfoRow(label, engLabel, value, extraLabel, extraEngLabel, extraValue) {
  if (typeof extraLabel === "undefined") {
    return (
      <tr>
        <td style={styles.labelCellSingle}>
          <div style={styles.thLabel}>{label}</div>
          {engLabel && <div style={styles.enLabel}>{engLabel}</div>}
        </td>
        <td colSpan="3" style={styles.valueCellWide}>
          {fmt(value)}
        </td>
      </tr>
    );
  }
  return (
    <tr>
      <td style={styles.labelCell}>
        <div style={styles.thLabel}>{label}</div>
        {engLabel && <div style={styles.enLabel}>{engLabel}</div>}
      </td>
      <td style={styles.valueCell}>{fmt(value)}</td>
      <td style={styles.labelCell}>
        <div style={styles.thLabel}>{extraLabel}</div>
        {extraEngLabel && <div style={styles.enLabel}>{extraEngLabel}</div>}
      </td>
      <td style={styles.valueCell}>{fmt(extraValue)}</td>
    </tr>
  );
}

function renderSignatureSection(signatures, sigDateStr, inspectorTitle, ownerTitle) {
  return (
    <div style={styles.signatureSection}>
      <div style={styles.signatureCard}>
        <div style={styles.signatureImageArea}>
          {signatures?.inspector ? (
            <img
              src={signatures.inspector}
              alt="Inspector signature"
              style={styles.signatureImage}
            />
          ) : null}
        </div>
        <div style={styles.signatureMeta}>
          <div style={styles.signatureTitle}>{inspectorTitle || "ผู้ตรวจสอบ"}</div>
          <div style={styles.signatureSubtitle}>Inspector</div>
          <div style={styles.signatureDate}>วันที่ {sigDateStr}</div>
        </div>
      </div>
      <div style={styles.signatureCard}>
        <div style={styles.signatureImageArea}>
          {signatures?.owner ? (
            <img
              src={signatures.owner}
              alt="Owner signature"
              style={styles.signatureImage}
            />
          ) : null}
        </div>
        <div style={styles.signatureMeta}>
          <div style={styles.signatureTitle}>{ownerTitle || "เจ้าของอาคาร / ผู้ดูแล"}</div>
          <div style={styles.signatureSubtitle}>Owner / Manager</div>
          <div style={styles.signatureDate}>วันที่ {sigDateStr}</div>
        </div>
      </div>
    </div>
  );
}

function renderPlaceholderChecklist(label, accentColor) {
  return (
    <div
      style={{
        border: `1px dashed ${borderColor}`,
        borderRadius: "4px",
        padding: "8px 10px",
        marginBottom: "6px",
        color: "#9ca3af",
        fontSize: "9px",
        textAlign: "center",
      }}
    >
      [ {label} — รอ spec จากทีมงาน ]
    </div>
  );
}

// ── Building Inspection content ────────────────────────────────────────────
function renderBuildingContent(formData, signatures, sigDateStr) {
  const accentColor = reportBlue;

  const page1 = (
    <>
      {renderHeader(
        "รายงานตรวจสอบอาคาร",
        `ชื่อโครงการ: ${fmt(formData.projectName)}   ปีที่ตรวจสอบ: ${fmt(formData.inspectionYear)}`,
        sigDateStr,
        formData.codeNo,
        accentColor,
      )}

      {/* General Info */}
      <div style={styles.pageBlock}>
        {renderSectionHeader("ข้อมูลทั่วไป", "GENERAL INFORMATION", accentColor)}
        <table style={styles.sectionTable}>
          <tbody>
            {renderInfoRow("ชื่อโครงการ", "Project Name", formData.projectName)}
            {renderInfoRow("ที่ตั้ง", "Address", formData.address)}
            {renderInfoRow(
              "ผู้ติดต่อ", "Contact", formData.contactName,
              "ปฏิบัติงาน", "Operated By", formData.operatedBy,
            )}
            {renderInfoRow(
              "เบอร์โทร", "Phone", formData.phone,
              "วันที่ตรวจสอบ", "Date", sigDateStr,
            )}
          </tbody>
        </table>
      </div>

      {/* Building Info */}
      <div style={styles.pageBlock}>
        {renderSectionHeader("ข้อมูลอาคาร", "BUILDING INFORMATION", accentColor)}
        <table style={styles.sectionTable}>
          <tbody>
            {renderInfoRow(
              "ชื่ออาคาร", "Building Name", formData.buildingName,
              "ประเภทอาคาร", "Type", formData.buildingType,
            )}
            {renderInfoRow(
              "จำนวนชั้น", "Floors", formData.buildingFloors,
              "พื้นที่ (ตร.ม.)", "Area (sqm)", formData.buildingArea,
            )}
            {renderInfoRow(
              "ผู้ตรวจสอบ", "Inspector", formData.inspectorName,
              "เลขที่ใบอนุญาต", "License No.", formData.inspectorLicense,
            )}
            {renderInfoRow("ปี พ.ศ.", "Year (B.E.)", formData.inspectionYear)}
          </tbody>
        </table>
      </div>

      {/* Checklist placeholder */}
      <div style={styles.pageBlock}>
        {renderSectionHeader("รายการตรวจสอบ", "INSPECTION CHECKLIST", accentColor)}
        {renderPlaceholderChecklist("ระบบโครงสร้างอาคาร", accentColor)}
        {renderPlaceholderChecklist("ระบบไฟฟ้า", accentColor)}
        {renderPlaceholderChecklist("ระบบดับเพลิง", accentColor)}
        {renderPlaceholderChecklist("ระบบสุขาภิบาล", accentColor)}
      </div>

      {/* Remarks + Signature */}
      <div style={styles.pageBlock}>
        {renderSectionHeader("หมายเหตุ / ข้อเสนอแนะ", "GENERAL REMARKS", accentColor)}
        <div style={styles.remarkBox}>
          <div style={styles.remarkText}>{formData.remark || "—"}</div>
        </div>
      </div>
      <div style={styles.pageBlock}>
        {renderSignatureSection(
          signatures,
          sigDateStr,
          "ผู้ตรวจสอบอาคาร",
          "เจ้าของอาคาร / ผู้ดูแลอาคาร",
        )}
      </div>
    </>
  );

  return [page1];
}

// ── Sign Inspection content ────────────────────────────────────────────────
function renderSignContent(formData, signatures, sigDateStr) {
  const accentColor = reportEmerald;

  const page1 = (
    <>
      {renderHeader(
        "รายงานตรวจสอบป้าย",
        `ชื่อโครงการ: ${fmt(formData.projectName)}   ปีที่ตรวจสอบ: ${fmt(formData.inspectionYear)}`,
        sigDateStr,
        formData.codeNo,
        accentColor,
      )}

      {/* General Info */}
      <div style={styles.pageBlock}>
        {renderSectionHeader("ข้อมูลทั่วไป", "GENERAL INFORMATION", accentColor)}
        <table style={styles.sectionTable}>
          <tbody>
            {renderInfoRow("ชื่อโครงการ / บริษัท", "Project Name", formData.projectName)}
            {renderInfoRow("ที่ตั้ง", "Address", formData.address)}
            {renderInfoRow(
              "ผู้ติดต่อ", "Contact", formData.contactName,
              "ปฏิบัติงาน", "Operated By", formData.operatedBy,
            )}
            {renderInfoRow(
              "เบอร์โทร", "Phone", formData.phone,
              "วันที่ตรวจสอบ", "Date", sigDateStr,
            )}
          </tbody>
        </table>
      </div>

      {/* Sign Info */}
      <div style={styles.pageBlock}>
        {renderSectionHeader("ข้อมูลป้าย", "SIGN INFORMATION", accentColor)}
        <table style={styles.sectionTable}>
          <tbody>
            {renderInfoRow(
              "รหัสป้าย", "Sign Code", formData.signCode,
              "ขนาดป้าย", "Dimension", formData.signDimension,
            )}
            {renderInfoRow(
              "วัสดุ", "Material", formData.signMaterial,
              "จุดติดตั้ง", "Location", formData.signLocation,
            )}
            {renderInfoRow(
              "ผู้ตรวจสอบ", "Inspector", formData.inspectorName,
              "เลขที่ใบอนุญาต", "License No.", formData.inspectorLicense,
            )}
            {renderInfoRow("ปี พ.ศ.", "Year (B.E.)", formData.inspectionYear)}
          </tbody>
        </table>
      </div>

      {/* Checklist placeholder */}
      <div style={styles.pageBlock}>
        {renderSectionHeader("รายการตรวจสอบ", "INSPECTION CHECKLIST", accentColor)}
        {renderPlaceholderChecklist("ความมั่นคงแข็งแรงของโครงสร้างป้าย", accentColor)}
        {renderPlaceholderChecklist("ระบบไฟฟ้าส่องสว่าง (ถ้ามี)", accentColor)}
        {renderPlaceholderChecklist("ความปลอดภัยต่อสาธารณชน", accentColor)}
        {renderPlaceholderChecklist("สถานะใบอนุญาต", accentColor)}
      </div>

      {/* Remarks + Signature */}
      <div style={styles.pageBlock}>
        {renderSectionHeader("หมายเหตุ / ข้อเสนอแนะ", "GENERAL REMARKS", accentColor)}
        <div style={styles.remarkBox}>
          <div style={styles.remarkText}>{formData.remark || "—"}</div>
        </div>
      </div>
      <div style={styles.pageBlock}>
        {renderSignatureSection(
          signatures,
          sigDateStr,
          "ผู้ตรวจสอบป้าย",
          "เจ้าของป้าย / ผู้ดูแล",
        )}
      </div>
    </>
  );

  return [page1];
}

// ── Main component ─────────────────────────────────────────────────────────
const InspectionReportPrintTemplate = forwardRef(
  ({ formData = {}, signatures = {} }, ref) => {
    const sigDateStr = fmtDateToDMY(formData.reportDate);
    const isSign = formData.reportType === "sign";
    const pages = isSign
      ? renderSignContent(formData, signatures, sigDateStr)
      : renderBuildingContent(formData, signatures, sigDateStr);
    const totalPages = pages.length;

    return (
      <div ref={ref} style={{ backgroundColor: "#fff" }}>
        {pages.map((pageContent, index) => (
          <React.Fragment key={index}>
            {renderPageShell(
              pageContent,
              index + 1,
              totalPages,
              index < totalPages - 1,
            )}
          </React.Fragment>
        ))}
      </div>
    );
  },
);

InspectionReportPrintTemplate.displayName = "InspectionReportPrintTemplate";
export default InspectionReportPrintTemplate;

// ── Styles ─────────────────────────────────────────────────────────────────
const styles = {
  page: {
    backgroundColor: "#fff",
    color: "#111827",
    fontFamily: "Arial, sans-serif",
    fontSize: "10px",
    lineHeight: 1.2,
    padding: "18px 18px 28px",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    position: "relative",
    minHeight: "297mm",
  },
  topBrandRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "12px",
  },
  logo: { width: "132px", height: "58px", objectFit: "contain" },
  qrWrap: { display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" },
  qrCode: { width: "54px", height: "54px", objectFit: "contain" },
  titleTable: { width: "100%", borderCollapse: "collapse", marginBottom: "8px" },
  titleCell: {
    border: `1px solid ${borderColor}`,
    textAlign: "center",
    fontSize: "15px",
    letterSpacing: "1.5px",
    color: "#ffffff",
    fontWeight: 700,
    padding: "5px 0",
  },
  metaLabelCell: {
    border: `1px solid ${borderColor}`,
    padding: "2px 5px",
    fontSize: "8px",
    color: "#6b7280",
    background: "#ffffff",
    width: "12%",
  },
  metaValueCell: {
    border: `1px solid ${borderColor}`,
    padding: "2px 6px",
    fontSize: "9px",
    background: "#ffffff",
    width: "38%",
  },
  reportSubtitle: {
    borderLeft: "4px solid",
    background: highlightYellow,
    fontSize: "9px",
    fontWeight: 600,
    padding: "3px 8px",
    marginBottom: "8px",
    color: "#374151",
  },
  sectionHeader: {
    borderLeft: "4px solid",
    color: "#000000",
    fontSize: "10px",
    fontWeight: 700,
    padding: "4px 6px",
    marginBottom: "2px",
  },
  sectionTable: { width: "100%", borderCollapse: "collapse", marginBottom: "8px" },
  labelCell: {
    width: "20%",
    border: `1px solid ${borderColor}`,
    padding: "3px 5px",
    verticalAlign: "top",
    fontWeight: 700,
    background: softBlueFill,
  },
  labelCellSingle: {
    width: "25%",
    border: `1px solid ${borderColor}`,
    padding: "3px 5px",
    verticalAlign: "top",
    fontWeight: 700,
    background: softBlueFill,
  },
  valueCell: {
    width: "30%",
    border: `1px solid ${borderColor}`,
    padding: "3px 7px",
    verticalAlign: "top",
  },
  valueCellWide: {
    border: `1px solid ${borderColor}`,
    padding: "3px 7px",
    verticalAlign: "top",
    whiteSpace: "pre-wrap",
  },
  thLabel: { fontSize: "10px", fontWeight: 700, color: "#111827" },
  enLabel: { fontSize: "8px", color: "#374151", marginTop: "1px" },
  pageBlock: { marginBottom: "10px" },
  remarkBox: {
    border: `1px solid ${borderColor}`,
    borderRadius: "2px",
    padding: "6px 8px",
    minHeight: "40px",
  },
  remarkText: { fontSize: "10px", whiteSpace: "pre-wrap", color: "#111827" },
  signatureSection: {
    display: "flex",
    gap: "12px",
    marginTop: "8px",
  },
  signatureCard: {
    flex: 1,
    border: `1px solid ${borderColor}`,
    borderRadius: "3px",
    padding: "6px 8px",
    textAlign: "center",
  },
  signatureImageArea: {
    height: "52px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "4px",
  },
  signatureImage: { maxHeight: "52px", maxWidth: "100%", objectFit: "contain" },
  signatureMeta: {},
  signatureTitle: { fontWeight: 700, fontSize: "10px", color: "#111827" },
  signatureSubtitle: { fontSize: "8px", color: "#6b7280", marginTop: "1px" },
  signatureDate: { fontSize: "9px", color: "#374151", marginTop: "3px" },
  companyFooter: {
    borderTop: `1px solid ${borderColor}`,
    marginTop: "8px",
    paddingTop: "5px",
    fontSize: "7px",
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 1.5,
  },
  pageNumber: {
    textAlign: "right",
    fontSize: "8px",
    color: "#6b7280",
    marginTop: "3px",
  },
};
