import '../Css/WebsiteCss/TermsAndConditions.css';

const TermsAndConditions = () => {
    return (
        <div className="terms-page">
            <div className="terms-header">
                <div className="terms-header-ornament">❧</div>
                <h1 className="terms-title">Terms & Conditions</h1>
                <p className="terms-subtitle">Knowledge Library — Please read carefully before using our services</p>
                <div className="terms-header-ornament">❧</div>
            </div>

            <div className="terms-container">
                <div className="terms-intro">
                    <p>
                        Welcome to <strong>Knowledge Library</strong>. By accessing or using our library management system,
                        you agree to be bound by the following terms and conditions. These terms govern your use of our
                        borrowing services, digital resources, and online platform.
                    </p>
                    <p className="terms-date">Last updated: May 2026</p>
                </div>

                <div className="terms-sections">

                    <div className="terms-section">
                        <div className="section-number">01</div>
                        <div className="section-content">
                            <h2>Membership & Eligibility</h2>
                            <ul>
                                <li>Library membership is open to all registered users who provide valid personal information during registration.</li>
                                <li>You must be at least 13 years of age to create an account. Users under 18 require parental consent.</li>
                                <li>Each individual is permitted only one active account. Duplicate accounts will be suspended.</li>
                                <li>You are responsible for maintaining the confidentiality of your account credentials and must not share them with any other party.</li>
                                <li>Membership may be revoked at any time for violation of these terms.</li>
                            </ul>
                        </div>
                    </div>

                    <div className="terms-divider" />

                    <div className="terms-section">
                        <div className="section-number">02</div>
                        <div className="section-content">
                            <h2>Borrowing Policy</h2>
                            <ul>
                                <li>Registered users may borrow available books through the platform subject to availability.</li>
                                <li>The borrowing period is fixed at <strong>14 days</strong> from the date of borrowing.</li>
                                <li>A maximum of <strong>3 books</strong> may be borrowed at one time per user.</li>
                                <li>Borrowers are responsible for the physical condition of borrowed materials. In the case of damage, the borrower must pay the full price of the book, or provide a new copy in special cases as determined by library administration.</li>
                                <li>In the event of theft or disappearance of a book for more than 30 days from the borrowing date, the borrower will be reported to the relevant authorities.</li>
                                <li>Books currently borrowed by other users cannot be reserved unless another copy becomes available.</li>
                            </ul>
                        </div>
                    </div>

                    <div className="terms-divider" />

                    <div className="terms-section">
                        <div className="section-number">03</div>
                        <div className="section-content">
                            <h2>Late Returns & Fines</h2>
                            <ul>
                                <li>Books returned after the 14-day period will incur a fine of <strong>50 dinars</strong> per day overdue.</li>
                                <li>Fines must be settled before borrowing additional books.</li>
                                <li>Persistent late returns may result in temporary suspension of borrowing privileges.</li>
                                <li>Fine payments are processed through the platform and are non-refundable once paid.</li>
                                <li>The library reserves the right to adjust fine rates with prior notice to users.</li>
                            </ul>
                        </div>
                    </div>

                    <div className="terms-divider" />

                    <div className="terms-section">
                        <div className="section-number">04</div>
                        <div className="section-content">
                            <h2>User Conduct</h2>
                            <ul>
                                <li>Users must treat library property and staff with respect at all times.</li>
                                <li>Any attempt to manipulate, exploit, or abuse the library system is strictly prohibited.</li>
                                <li>Users may not share their login credentials or allow others to borrow books under their account.</li>
                                <li>Submitting false information during registration or any library transaction is grounds for immediate termination of membership.</li>
                                <li>The library reserves the right to investigate and act upon reports of misconduct.</li>
                            </ul>
                        </div>
                    </div>

                    <div className="terms-divider" />

                    <div className="terms-section">
                        <div className="section-number">05</div>
                        <div className="section-content">
                            <h2>Privacy & Data</h2>
                            <ul>
                                <li>We collect personal information solely for the purpose of providing library services.</li>
                                <li>Your data will never be sold or shared with third parties without your explicit consent.</li>
                                <li>Borrowing history and account activity are stored securely and used only for library operations.</li>
                                <li>You may request deletion of your personal data at any time by contacting library administration.</li>
                                <li>Cookies and session data may be used to improve platform performance and user experience.</li>
                            </ul>
                        </div>
                    </div>

                    <div className="terms-divider" />

                    <div className="terms-section">
                        <div className="section-number">06</div>
                        <div className="section-content">
                            <h2>Modifications to Terms</h2>
                            <ul>
                                <li>Knowledge Library reserves the right to update these terms and conditions at any time.</li>
                                <li>Users will be notified of significant changes via email or platform notification.</li>
                                <li>Continued use of the platform following any changes constitutes acceptance of the updated terms.</li>
                                <li>It is your responsibility to review these terms periodically for updates.</li>
                            </ul>
                        </div>
                    </div>

                    <div className="terms-divider" />

                    <div className="terms-section">
                        <div className="section-number">07</div>
                        <div className="section-content">
                            <h2>Limitation of Liability</h2>
                            <ul>
                                <li>Knowledge Library is not liable for any loss or damage resulting from the use or inability to use the platform.</li>
                                <li>We do not guarantee uninterrupted access to digital services and reserve the right to perform maintenance at any time.</li>
                                <li>The library is not responsible for personal items left on library premises.</li>
                                <li>All content provided through the platform is for informational and educational purposes only.</li>
                            </ul>
                        </div>
                    </div>

                </div>

                <div className="terms-footer">
                    <div className="terms-footer-ornament">✦</div>
                    <p>By using Knowledge Library's services, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions.</p>
                    <p>For questions or concerns, please contact our administration team.</p>
                    <div className="terms-footer-ornament">✦</div>
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions;