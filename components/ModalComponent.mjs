import Title from './title.mjs';


/**
 * A modal component.
 */
export default function ModalComponent({ title = "Test Modal", children }) {
    console.log(`Creating dialog ${title}`);
    return (
        <>
            <div className="modal-backdrop"></div>
            <dialog className="modal" open>
                <header>
                </header>
                <main>
                    {children}
                </main>
            </dialog>
        </>
    );
}