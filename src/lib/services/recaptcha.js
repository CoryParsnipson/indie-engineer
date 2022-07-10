import { env } from '$lib/util/env';

export async function assess(token, action = "undefined") {
  const recaptcha_endpoint = `https://recaptchaenterprise.googleapis.com/v1/projects/${env.var.VITE_CAPTCHA_PROJECT_ID}/assessments?key=${env.var.VITE_CAPTCHA_API_KEY}`;

  const data = {
    event: {
      token: token,
      siteKey: env.var.VITE_CAPTCHA_SITEKEY,
      expectedAction: action,
    },
  };

  let res = await fetch(recaptcha_endpoint, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(data),
  });

  const assessment = await res.json();
  return assessment;
}

export function evalAssessment(assessment, threshhold, expectedAction) {
  let result = {
    decision: false,
  };

  try {
    const tp = assessment.tokenProperties;
    const ra = assessment.riskAnalysis;
    const ev = assessment.event;

    if (!tp.valid) {
      result.reasons = [];
      result.reasons.push("invalid assessment");
      result.reasons.push(tp.invalidReason);
      return result;
    }

    if (ra.score < threshhold) {
      result.reasons = [];
      result.reasons.push("score too low");
      result.reasons = [...result.reasons, ...ar.reasons];
      return result;
    }

    if (tp.action != expectedAction || ev.expectedAction != expectedAction) {
      result.reasons = [];
      result.reasons.push("action does not match");
      return result;
    }

    result.decision = true;
    return result;
  } catch (error) {
    result.reason = error;
    return result;
  }
}
