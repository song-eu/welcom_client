-- MONTHLY OUTPATIENT VISIT 
-- 1. 1년 단위 추출 
-- 1_1year_total_by_hospital_OUT.csv
SELECT TO_CHAR(MED_DT, 'YYYY-MM') "MONTH"
	, HSP_DTL_TP_NM HOSPITAL
	, COUNT(*) ROWCNT
	, COUNT(DISTINCT PT_NO) PCNT
	, COUNT(CASE WHEN MED_YN = 'Y' THEN 1 END ) MED_Y_CNT -- 진료여부 Y 만..?
	, COUNT(CASE WHEN MED_YN = 'N' THEN 1 END ) MED_N_CNT -- 진료여부 N 만..?
	, ROUND(COUNT(CASE WHEN MED_YN != 'Y' THEN 1 END ) /COUNT(*) * 100, 2) MED_N_RATE
FROM FT_CRE_VIST
WHERE
-- 방문일 설정: 2021년 7월 환자
MED_DT BETWEEN date_trunc('month', now() - interval '1 year') 
AND date_trunc('month', now())::date - 1
-- 외래, 입원, 응급
--AND PACT_TP_NM IN ('외래')
GROUP BY TO_CHAR(MED_DT, 'YYYY-MM'), HSP_DTL_TP_NM
ORDER BY 1, 2
;



/*5_1year_monthly_total_OUT .csv _ SURGERY*/ 
SELECT to_char(SRGR_STR_DTM, 'YYYY-MM') "MONTH", count(DISTINCT PT_NO) PCNT
FROM FT_CRE_SRGR
WHERE SRGR_STR_DTM  BETWEEN date_trunc('month', now() - interval '1 year') 
AND date_trunc('month', now())::date - 1
--	AND (date_trunc('month', now() - interval '1 month') + interval '1 month - 1day')::date
GROUP BY  to_char(SRGR_STR_DTM, 'YYYY-MM')
ORDER BY 1;

-- 4. OUTPATIENT VISIT BY Department Order by top visits
-- 2_visit_dept_rank_YEAR_OUT.json
SELECT date_part('year', now() - interval '1 month')::varchar "MONTH"
	, MED_DEPT_CD
	, MED_DEPT_NM 
	, COUNT(*) ROWCNT
	, COUNT(DISTINCT PT_NO) PCNT
	, COUNT(CASE WHEN MED_YN = 'Y' THEN 1 END ) MED_Y_CNT -- 진료여부 Y 만..?
	, COUNT(CASE WHEN MED_YN = 'N' THEN 1 END ) MED_N_CNT -- 진료여부 N 만..?
	, ROUND(COUNT(CASE WHEN MED_YN != 'Y' THEN 1 END ) /COUNT(*) * 100, 2) MED_N_RATE
FROM FT_CRE_VIST
WHERE 1=1
-- 방문일 설정: 2021년 7월 환자
AND MED_DT BETWEEN date_trunc('month', now() - interval '1 year')
AND date_trunc('month', now())::date - 1
-- 외래, 입원, 응급
--AND PACT_TP_NM = '외래'
AND AGE_CD_YY IS NOT  NULL 
AND MED_DEPT_CD NOT IN ('AER', 'MCI', 'PDER')
AND MED_DEPT_NM IS NOT NULL 
GROUP BY  MED_DEPT_CD , MED_DEPT_NM 
ORDER BY 1, 5 desc;


-- LEFT SCREEN 4. SNUH Top Diagnosis Last 1 Year
-- monthly_dgns_order_by_hsp_pcnt.json
DROP TABLE D02760.TEMP_CONDITION_RANK ;
CREATE TABLE D02760.temp_condition_rank AS 
WITH C AS (
SELECT ROW_NUMBER () OVER (PARTITION BY B.HSP_DTL_TP_CD ORDER BY count( DISTINCT A.PT_NO) DESC) "RN"
, date_part('year', now() - interval '1 month')::varchar "YEAR"
, HSP_DTL_TP_CD "HSP_TP_CD"
, CLDG_VOC_ID 
--,  ICD10_CD 
, count(*) ROWCNT, count(DISTINCT A.PACT_ID) VISITCNT, count(DISTINCT A.PT_NO) PCNT
FROM FT_CRE_DGNS A
INNER JOIN FT_CRE_VIST B 
ON A.PACT_ID = B.PACT_ID 
WHERE DGNS_REG_DT BETWEEN date_trunc('month', now() - interval '1 year') AND date_trunc('month', now())::date - 1
--and B.HSP_DTL_TP_CD = 'G'
GROUP BY B.HSP_DTL_TP_CD ,  CLDG_VOC_ID   
ORDER BY 2, 3, 7 DESC
)
SELECT C.*
	,(SELECT ICD10_CD FROM LT_CRE_DGNS B
	WHERE C.CLDG_VOC_ID = B.VOC_ID 
	) ICD10_CD 
	,(SELECT voc_nm FROM LT_CRE_DGNS B
	WHERE C.CLDG_VOC_ID = B.VOC_ID 
	) CLDG_NM 
FROM C C
WHERE rn <= 40
;


-- monthly_dgns_order_by_hsp_pcnt.json
SELECT * 
FROM temp_condition_rank;

/* LEFT SCREEN 5. SNUH Top procedure Last 1 Year
 * monthly_age_sec_group_order_by_srgr
 * yearly_procedure_order_by_hsp_pcnt_OUT.json
 * */
DROP TABLE D02760.temp_procedure_rank ;
CREATE TABLE D02760.temp_procedure_rank AS 
WITH a AS (
SELECT date_part('year', now() - interval '1 month')::varchar "YEAR"
,B.HSP_DTL_TP_CD "HSP_TP_CD", OP_VOC_ID,  fsd.MED_DEPT_CD, count(*) ROWCNT, count(DISTINCT fsd.PACT_ID) VISITCNT, count(DISTINCT fsd.PT_NO) PCNT 
FROM FT_CRE_SRGR fsd
INNER JOIN FT_CRE_VIST B 
ON fsd.PACT_ID = B.PACT_ID 
WHERE 1=1
AND SRGR_STR_DTM   BETWEEN date_trunc('month', now() - interval '1 year') AND date_trunc('month', now())::date - 1
AND fsd.MED_DEPT_CD NOT IN ('ANO2', 'RHMSK', 'AN', 'TVS')
AND ICD9CM_CD NOT IN ('68.12', '99.99', '13.71', '54.11', '85.99', '15.3', '15.11')
GROUP BY B.HSP_DTL_TP_CD, OP_VOC_ID ,  fsd.MED_DEPT_CD
ORDER BY 1, 2, 7 DESC)
SELECT a.* 
,(SELECT ICD9CM_CD FROM LT_CRE_SRGR lss WHERE a.OP_VOC_ID = lss.VOC_ID) ICD9CM_CD 
,(SELECT voc_nm FROM LT_CRE_SRGR lss WHERE a.OP_VOC_ID = lss.VOC_ID) OP_VOC_NM 
FROM a a
WHERE pcnt > 50
ORDER BY 1 DESC, 2, 7 desc
;

--yearly_procedure_order_by_hsp_pcnt_OUT.json
SELECT *
FROM temp_procedure_rank
order by 2, 7 desc;

