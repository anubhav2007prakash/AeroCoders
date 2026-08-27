from datetime import datetime
from typing import List
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.weather_models import CrowdReport
from app.schemas.weather_schemas import CrowdReportCreate, CrowdReportResponse

router = APIRouter(prefix="/api/crowd-source", tags=["Crowd Source"])

@router.get("", response_model=List[CrowdReportResponse])
def get_crowd_reports(db: Session = Depends(get_db)):
    return db.query(CrowdReport).order_by(CrowdReport.id.desc()).limit(20).all()

@router.post("", response_model=CrowdReportResponse, status_code=status.HTTP_201_CREATED)
def submit_crowd_report(report: CrowdReportCreate, db: Session = Depends(get_db)):
    now_str = datetime.now().strftime("%d %b %Y, %H:%M IST")
    new_report = CrowdReport(
        location_name=report.location_name,
        condition=report.condition,
        severity=report.severity,
        description=report.description,
        image_url=report.image_url,
        reporter_name=report.reporter_name or "Citizen Reporter",
        timestamp=now_str
    )
    db.add(new_report)
    db.commit()
    db.refresh(new_report)
    return new_report
